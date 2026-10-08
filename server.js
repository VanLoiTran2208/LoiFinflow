const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const DATA_FILE = path.join(__dirname, 'finflow-data.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Tìm địa chỉ IP nội bộ (LAN IP) để điện thoại truy cập cùng mạng Wi-Fi
function getLocalExternalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const LAN_IP = getLocalExternalIP();

// Danh sách các kết nối thời gian thực (Server-Sent Events) từ Máy tính & Điện thoại
const sseClients = new Set();
let lastServerModified = Date.now();

// Broadcast event tới tất cả các thiết bị đang mở app
function broadcastUpdate(senderId, payload) {
  lastServerModified = Date.now();
  const eventData = JSON.stringify({
    type: 'sync_update',
    timestamp: lastServerModified,
    senderId: senderId || null,
  });

  for (const client of sseClients) {
    try {
      client.write(`data: ${eventData}\n\n`);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

// Keep-alive ping mỗi 20 giây để không bị ngắt kết nối trên điện thoại
setInterval(() => {
  for (const client of sseClients) {
    try {
      client.write(': ping\n\n');
    } catch (e) {
      sseClients.delete(client);
    }
  }
}, 20000);

// Hỗ trợ cơ sở dữ liệu đám mây PostgreSQL (Render Postgres, Supabase, Neon) nếu có DATABASE_URL
let pgPool = null;
if (process.env.DATABASE_URL) {
  try {
    const { Pool } = require('pg');
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
    });
    pgPool.query(`
      CREATE TABLE IF NOT EXISTS finflow_store (
        id VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at BIGINT NOT NULL
      );
    `).then(() => {
      console.log('✅ Đã kết nối cơ sở dữ liệu PostgreSQL (Lưu trữ vĩnh viễn trên Cloud)');
    }).catch(err => {
      console.warn('Không thể kết nối PostgreSQL, dùng tệp finflow-data.json:', err.message);
      pgPool = null;
    });
  } catch (err) {
    console.log('Chưa cài pg, sử dụng bộ lưu trữ tệp tin finflow-data.json.');
  }
}

const server = http.createServer((req, res) => {
  // CORS Headers để hỗ trợ mọi thiết bị và domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Sender-Device');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // 1. API: Get Network Info & Status
  if (url.pathname === '/api/network' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      lanIp: LAN_IP,
      port: PORT,
      mobileUrl: `http://${LAN_IP}:${PORT}`,
      connectedDevices: sseClients.size,
      lastModified: lastServerModified
    }));
    return;
  }

  // 2. API: Server-Sent Events (SSE) - Real-time push tới mọi thiết bị
  if (url.pathname === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write(`data: ${JSON.stringify({ type: 'connected', clientsCount: sseClients.size + 1 })}\n\n`);
    sseClients.add(res);

    req.on('close', () => {
      sseClients.delete(res);
    });
    return;
  }

  // 3. API: Get Central Data
  if (url.pathname === '/api/data' && req.method === 'GET') {
    const respondFile = () => {
      if (fs.existsSync(DATA_FILE)) {
        try {
          const content = fs.readFileSync(DATA_FILE, 'utf8');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(content);
          return;
        } catch (err) {}
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'empty', lastModified: lastServerModified }));
    };

    if (pgPool) {
      pgPool.query('SELECT data FROM finflow_store WHERE id = $1', ['central_data'])
        .then(dbRes => {
          if (dbRes.rows.length > 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dbRes.rows[0].data));
          } else {
            respondFile();
          }
        })
        .catch(() => respondFile());
    } else {
      respondFile();
    }
    return;
  }

  // 4. API: Save Central Data & Broadcast Update
  if (url.pathname === '/api/data' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body);
        parsed.lastModified = Date.now();
        const jsonStr = JSON.stringify(parsed, null, 2);

        // Luôn lưu bản sao vào file cục bộ
        try {
          fs.writeFileSync(DATA_FILE, jsonStr, 'utf8');
        } catch (fErr) {}

        // Lưu vào PostgreSQL nếu đã kết nối
        if (pgPool) {
          try {
            await pgPool.query(`
              INSERT INTO finflow_store (id, data, updated_at)
              VALUES ($1, $2, $3)
              ON CONFLICT (id) DO UPDATE SET data = $2, updated_at = $3;
            `, ['central_data', parsed, parsed.lastModified]);
          } catch (dbErr) {
            console.error('Lỗi ghi PostgreSQL:', dbErr.message);
          }
        }

        const senderId = req.headers['x-sender-device'] || null;
        broadcastUpdate(senderId, parsed);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          savedAt: new Date().toISOString(),
          lastModified: parsed.lastModified,
          connectedDevices: sseClients.size,
          storageType: pgPool ? 'postgresql' : 'file'
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 5. Static File Serving
  let filePath = path.join(PUBLIC_DIR, url.pathname === '/' ? 'index.html' : url.pathname);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Fallback to index.html for SPA
        fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (spaErr, spaContent) => {
          if (spaErr) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(spaContent);
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Lỗi máy chủ: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

// Lắng nghe trên 0.0.0.0 để điện thoại có thể truy cập được
server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 FinFlow Web & Real-Time Sync Server đang chạy:`);
  console.log(`💻 Trên máy tính:   http://localhost:${PORT}`);
  console.log(`📱 Trên điện thoại: http://${LAN_IP}:${PORT}`);
  console.log(`🌐 SSE Realtime:    http://${LAN_IP}:${PORT}/api/events`);
  console.log(`=======================================================`);
});

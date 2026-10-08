# Hướng Dẫn Xuất Link Online & Đồng Bộ Real-Time Đa Thiết Bị (FinFlow)

Hệ thống **FinFlow** đã được nâng cấp toàn diện với tính năng **Đồng Bộ Dòng Tiền Thời Gian Thực (Real-Time Bi-Directional Sync)** giữa Máy tính & Điện thoại.

Bất kỳ khi nào bạn hoặc người thân ghi chép, sửa đổi phân bổ quỹ, hay thay đổi mật khẩu trên một thiết bị (máy tính hoặc điện thoại), các thiết bị khác đang đăng nhập cùng tài khoản sẽ **tự động nhảy số và cập nhật ngay lập tức** mà không cần phải tải lại trang (F5).

---

## 📱 CÁCH 1: Dùng Ngay Trên Điện Thoại (Cùng Mạng Wi-Fi Với Máy Tính) - Nhanh nhất (0 giây)

Nếu điện thoại của bạn đang kết nối chung mạng Wi-Fi với máy tính:
1. Mở ứng dụng FinFlow trên máy tính, bấm nút **🟢 Đồng Bộ Live** trên thanh tiêu đề.
2. Mở camera điện thoại (iPhone hoặc Android / Zalo / Google Lens) quét **Mã QR** to hiển thị trên màn hình.
3. Hoặc gõ trực tiếp địa chỉ vào trình duyệt điện thoại:
   👉 **`http://10.192.38.20:3000`**
4. Đăng nhập vào tài khoản của bạn (mật khẩu mặc định: `123`).
5. **Dùng toàn màn hình như App di động:**
   - Trên **iOS (Safari)**: Chọn biểu tượng *Chia sẻ* ➔ *Thêm vào Màn hình chính (Add to Home Screen)*.
   - Trên **Android (Chrome)**: Chọn biểu tượng *Ba chấm ⋮* ➔ *Thêm vào màn hình chính*.

---

## 🌐 CÁCH 2: Cloud Server Miễn Phí 24/7 (Đồng Bộ Dữ Liệu Toàn Cầu, Kể Cả Tắt Máy Tính)

Để ai cũng có thể truy cập được từ bất kỳ đâu qua mạng 4G/5G hoặc Wi-Fi khác, thư mục dự án đã có sẵn trọn bộ file triển khai chuẩn cho Cloud:
- `package.json` (Cấu hình chuẩn Node.js)
- `render.yaml` (Cấu hình 1-click cho Render.com)
- `Procfile` (Cấu hình cho Railway / Heroku)
- `server.js` (Máy chủ Realtime SSE & Database trung tâm)
- `index.html` (Giao diện FinFlow Bento Grid)

### Các bước triển khai miễn phí 100% lên Render.com (hoặc Railway.app):
1. Đăng ký tài khoản miễn phí tại **[Render.com](https://render.com)**.
2. Tải thư mục `finflow-app` lên GitHub (hoặc kéo thả code).
3. Trên Render Dashboard, chọn **New +** ➔ **Web Service**.
4. Kết nối kho GitHub của bạn. Render sẽ tự động phát hiện `server.js` và `package.json`.
5. Bấm **Deploy**. Sau khoảng 1 phút, bạn sẽ nhận được đường link HTTPS công khai vĩnh viễn (ví dụ: `https://finflow-giadinh.onrender.com`).
6. Đường link này hoạt động liên tục 24/7 trên toàn thế giới, dữ liệu thu chi được đồng bộ tức thì lên đám mây!

---

## ⚡ CÁCH 3: Mở Link Online Tức Thì Từ Máy Tính (Cloudflare Tunnel - 1 Click)

Nếu bạn muốn mở ngay 1 đường link online HTTPS công khai cho người thân ở xa mà không cần tạo tài khoản Cloud:
1. Trong thư mục dự án `finflow-app`, bấm đúp chuột chạy file:
   👉 **`run-online-tunnel.bat`**
2. Công cụ sẽ tự động tạo một đường hầm HTTPS bảo mật toàn cầu (ví dụ: `https://finflow-xxxx.trycloudflare.com`).
3. Bạn gửi link này cho người thân hoặc quét mã QR để mở từ bất kỳ mạng nào!

---

---

## 💾 CƠ CHẾ LƯU TRỮ VĨNH VIỄN & BẢO VỆ CHI TIÊU KHÔNG BAO GIỜ BỊ RESET

### ❓ Vì sao trên Render gói Free trước đây ngày hôm sau lại bị mất chi tiêu?
1. **Bộ nhớ tạm thời (Ephemeral Filesystem) của Cloud Free:** Trên Render hoặc Heroku gói miễn phí, sau 15 phút không có người truy cập, máy chủ sẽ tự động "ngủ" (Spin down). Khi có người mở lại, Render khởi động container mới từ mã nguồn GitHub ban đầu, khiến tệp `finflow-data.json` bị đặt lại về ban đầu.
2. **Cơ chế ghi đè trước đây:** Khi trình duyệt mở lại trang web vào ngày hôm sau, nó tải dữ liệu mặc định từ máy chủ vừa khởi động và vô tình ghi đè lên bộ nhớ của máy bạn.

### 🛡️ GIẢI PHÁP 3 TẦNG BẢO VỆ TOÀN DIỆN ĐÃ ĐƯỢC TÍCH HỢP:
1. **Tầng 1 (Offline-First Trình Duyệt):** Mọi giao dịch chi tiêu được lưu tức thì vào bộ nhớ vĩnh viễn của trình duyệt (`localStorage`) trên máy tính và điện thoại của bạn.
2. **Tầng 2 (Smart Merge & Tự Động Chữa Lành Máy Chủ):** Khi bạn mở trang web, FinFlow so sánh dữ liệu thông minh theo ID từng giao dịch (Smart Merge) và Tombstone (danh sách đã xóa). Nếu phát hiện máy chủ Render vừa khởi động lại và bị thiếu chi tiêu của bạn, **trình duyệt sẽ tự động đẩy toàn bộ chi tiêu lên máy chủ để chữa lành ngay lập tức**! Bạn không bao giờ bị mất chi tiêu nữa.
3. **Tầng 3 (Sao Lưu & Khôi Phục 1-Chạm):** Trong cửa sổ "Trung Tâm Đồng Bộ & Link Online", bấm sang tab **💾 Sao Lưu & Khôi Phục**:
   - **Tải File Sao Lưu (.json):** Xuất toàn bộ chi tiêu, tài khoản và quy tắc về máy để cất giữ an toàn.
   - **Khôi Phục Dữ Liệu (.json):** Nạp lại dữ liệu trên bất kỳ máy mới nào trong 1 giây.

### 🐘 LƯU TRỮ ĐÁM MÂY VĨNH VIỄN 100% VỚI RENDER POSTGRESQL (MIỄN PHÍ):
Nếu muốn máy chủ Cloud Render lưu trực tiếp vào cơ sở dữ liệu chuyên nghiệp:
1. Trên trang quản lý [Render.com](https://dashboard.render.com), bấm **New +** ➔ chọn **PostgreSQL**.
2. Đặt tên (ví dụ: `finflow-db`), chọn gói **Free**, bấm **Create Database**.
3. Sau khi tạo xong, cuộn xuống mục **Connections**, sao chép dòng **Internal Database URL** (hoặc External Database URL).
4. Vào Web Service FinFlow của bạn trên Render ➔ chọn mục **Environment** ➔ bấm **Add Environment Variable**:
   - Key: `DATABASE_URL`
   - Value: Dán đường link PostgreSQL vừa sao chép ở trên.
5. Render sẽ tự động kết nối PostgreSQL và lưu vĩnh viễn toàn bộ chi tiêu vào bảng `finflow_store`, không bao giờ bị reset kể cả sau khi ngủ hay triển khai lại mã nguồn!

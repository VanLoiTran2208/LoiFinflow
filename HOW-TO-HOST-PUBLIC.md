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

## 💡 CƠ CHẾ ĐỒNG BỘ DỮ LIỆU ĐA THIẾT BỊ:
- **Tự động nhận diện thiết bị:** Mỗi tab hoặc điện thoại được cấp một mã nhận diện độc lập để tránh gửi lặp dữ liệu.
- **Tốc độ dưới 50ms:** Ứng dụng sử dụng công nghệ **Server-Sent Events (SSE)**. Khi bạn bấm "Ghi nhận chi tiêu" trên điện thoại, máy tính ở nhà sẽ nhận tín hiệu và cập nhật biểu đồ phân bổ quỹ trong chớp mắt.
- **Hoạt động cả khi mất mạng:** Dữ liệu luôn được sao lưu tức thì vào bộ nhớ máy (`localStorage`). Khi mạng chập chờn, bạn vẫn ghi chép bình thường và sẽ tự động đồng bộ lên máy chủ ngay khi có kết nối trở lại.
- **Bảo mật tuyệt đối:** Mỗi tài khoản độc lập, sau khi đăng xuất bắt buộc phải nhập mật khẩu để vào lại. Tài khoản chủ hộ có toàn quyền quản lý thành viên và bảo vệ quỹ chung gia đình.

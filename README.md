# FinFlow - Ứng Dụng Quản Lý Dòng Tiền Cá Nhân & Tài Chính Gia Đình (MVP)

Ứng dụng web quản lý dòng tiền toàn diện theo phương pháp phân bổ quỹ đầu tháng (Envelope Budgeting / 6 chiếc lọ / 50-30-20), ghi chép thu chi thực tế hàng ngày và phân tích hiệu quả tài chính.

## 🌟 Tính Năng Nổi Bật

1. **Bảo Mật Bắt Buộc Mật Khẩu, Đổi Mật Khẩu & Dữ Liệu Riêng Biệt (Isolated Multi-Accounts & Auth):**
   - **Bắt buộc nhập mật khẩu khi đăng nhập:** Sau khi đăng xuất, người dùng bắt buộc phải nhập đúng mật khẩu của tài khoản để mở khóa ứng dụng (không còn đăng nhập 1-chạm tùy tiện).
   - **Tính năng Đổi Mật Khẩu An Toàn (Change Password):** Chỉ cá nhân đang đăng nhập mới có quyền đổi mật khẩu của chính mình. Hệ thống bắt buộc phải nhập đúng **Mật khẩu cũ (hiện tại)** mới cho phép đặt mật khẩu mới, kèm bước xác nhận mật khẩu để tránh gõ nhầm.
   - **Dữ liệu chi tiêu độc lập 100%:** Mỗi tài khoản cá nhân có mức thu nhập, tỷ lệ phân bổ quỹ và sổ ghi chép chi tiêu hoàn toàn riêng biệt, không bị liên kết hay nhìn thấy dữ liệu cá nhân của nhau.
   - **Không gian Gia đình có mã mời (Invite-Only Gate):** Tài khoản cá nhân chỉ có thể truy cập Không gian Gia đình nếu được **Chủ Hộ cấp mã mời** (ví dụ: `FAM-8826-FIN`). Nếu chưa nhập mã mời, không gian gia đình sẽ bị khóa an toàn.
   - **Quyền Chủ Hộ (Owner Privileges):** Tài khoản Chủ Hộ có toàn quyền quản trị và có thể **xóa thành viên** ra khỏi nhóm gia đình bất cứ lúc nào.

2. **Thiết lập Phân bổ Quỹ Đầu Tháng (% Allocation):**
   - Tùy chỉnh danh sách các quỹ tài chính (Thiết yếu, Tiết kiệm, Đầu tư sinh lời, Hưởng thụ, Học tập, Cho đi).
   - Thanh trượt tương tác điều chỉnh % tức thì kèm ô nhập số.
   - Các mẫu thiết lập nhanh: *Quy tắc 6 chiếc lọ (T. Harv Eker)*, *Quy tắc 50/30/20 (Elizabeth Warren)*, *Chiến lược Tự do tài chính*.
   - Kiểm tra hợp lệ nghiêm ngặt: Thanh tiến độ đổi màu cảnh báo (Xanh khi đủ 100%, Đỏ khi >100%, Cam khi <100%).
   - Tự động quy đổi số tiền VND khả dụng tương ứng với thu nhập tháng.

3. **Bento Grid Dashboard Trực Quan:**
   - 4 Thẻ KPI dòng tiền: Tổng ngân sách tháng, Đã chi thực tế, Khả dụng còn lại, Tốc độ chi tiêu (% Burn rate).
   - Trợ lý sức khỏe tài chính (Health Insights): Cảnh báo sớm các quỹ sắp chạm trần hoặc đã bị bội chi.
   - Danh sách các hũ tiền với thanh tiến độ đổi màu thông minh:
     - 🟢 `< 80%`: Vùng an toàn
     - 🟡 `80% - 99%`: Sắp chạm trần ngân sách
     - 🔴 `≥ 100%`: Cảnh báo bội chi (Vượt ngân sách)
   - Biểu đồ cột so sánh trực quan giữa **Ngân sách cấp** vs **Thực tế đã chi**.

4. **Ghi Chép Chi Tiêu Siêu Tốc (< 5 giây) - 3 Chế Độ Đỉnh Cao:**
   - 🤖 **Gõ Cú Pháp Tự Nhiên (Smart NLP):** Chỉ cần gõ *"an trua 45k"*, *"cafe 35k"*, *"do xang 80k"*, *"sieu thi 250k"*, *"tien dien 1.2tr"*... Hệ thống tự động tách tiền và tự khớp vào Quỹ tương ứng, nhấn Enter lưu ngay trong 2 giây!
   - ⚡ **1-Chạm Siêu Tốc (Quick Presets):** Danh mục các khoản chi tiêu hàng ngày quen thuộc (*Cà phê 35k, Ăn sáng 40k, Cơm trưa 50k, Đổ xăng 80k, Đi chợ 250k...*). Chỉ cần **1 chạm duy nhất** là giao dịch được ghi nhận tức thì (< 1 giây).
   - 🔢 **Bàn Phím Số Fintech (Numpad Calculator):** Màn hình số lớn theo phong cách Apple Wallet / Fintech, bàn phím số Numpad tiện dụng kèm phím cộng dồn (`+50k`, `+100k`, `+500k`) và tính năng **Quét hóa đơn (OCR)** tự động nhận diện số tiền từ ảnh chụp biên lai.

5. **Báo Cáo & Phân Tích Chuyên Sâu (Analytics):**
   - Biểu đồ Doughnut thể hiện cơ cấu chi tiêu thực tế giữa các quỹ.
   - Dự phóng tích lũy tài sản ròng qua 12 tháng (Tiết kiệm + Đầu tư tạo lãi kép).

6. **Sao Lưu & Đồng Bộ Dữ Liệu:**
   - Lưu trữ tự động trên máy (LocalStorage).
   - Xuất file sao lưu `.json` và Nhập lại bất cứ khi nào.
   - Nút khôi phục dữ liệu mẫu thực tế ban đầu (Reset Sample Data).
   - Hỗ trợ chế độ Dark Mode & Light Mode sang chảnh.

---

## 🚀 Cách Truy Cập & Khởi Chạy Ứng Dụng

### 💻 1. Mở Trên Máy Tính (PC / Laptop)
Ứng dụng đang được phục vụ bởi server cục bộ:
👉 **[http://localhost:3000](http://localhost:3000)**

*(Hoặc click đúp file `start.bat` để khởi chạy bất kỳ lúc nào).*

---

### 📱 2. Mở Trên Điện Thoại Di Động (Mobile Web App)
Trang web được thiết kế theo chuẩn **Mobile-First Responsive**, tối ưu hoàn hảo cho trình duyệt trên smartphone (Safari, Chrome, Cốc Cốc, Samsung Internet...):

1. **Cách 1 (Quét mã QR siêu nhanh):** Trên giao diện máy tính, bấm nút **📱 Điện Thoại** ở góc trên cùng bên phải. Bật camera điện thoại quét mã QR xuất hiện trên màn hình để mở ngay!
2. **Cách 2 (Nhập liên kết trực tiếp):** Mở trình duyệt trên điện thoại và gõ liên kết:
   👉 **http://10.192.38.20:3000**
   *(Lưu ý: Điện thoại và máy tính cần kết nối chung vào cùng một mạng Wi-Fi).*

#### ✨ Mẹo Sử Dụng Như App Độc Lập (Add to Home Screen):
- **Trên iPhone (Safari):** Bấm biểu tượng **Chia sẻ** (hình mũi tên hướng lên) ➔ Chọn **"Thêm vào MH chính" (Add to Home Screen)**.
- **Trên Android (Chrome):** Bấm menu **3 chấm** ở góc trên ➔ Chọn **"Thêm vào màn hình chính" (Install app / Add to Home screen)**.
- Ứng dụng sẽ có biểu tượng riêng trên màn hình điện thoại, mở lên toàn màn hình mượt mà không có thanh địa chỉ web, giao diện đáy có thanh điều hướng ngón cái (Bottom Nav) và nút ghi chép siêu tốc `+` ở giữa!

---

## 🔑 Thông Tin Tài Khoản Mẫu Để Trải Nghiệm

| Tài Khoản | Email | Mật Khẩu | Vai Trò & Quyền Hạn |
| :--- | :--- | :--- | :--- |
| **Trần Văn Lợi** | `loi.tran@finflow.app` | `123` | **👑 Chủ Hộ (Toàn quyền quản trị, xóa thành viên, xem quỹ gia đình)** |
| **Nguyễn Thu Hà** | `ha.nguyen@finflow.app` | `123` | **Thành viên gia đình (Xem & đóng góp quỹ chung gia đình)** |
| **Lê Minh Khôi** | `khoi.le@finflow.app` | `123` | **Tài khoản cá nhân độc lập (Chưa vào gia đình, cần mã `FAM-8826-FIN`)** |

*Bạn cũng có thể bấm "Tạo Tài Khoản Mới" để tạo thêm tài khoản riêng biệt không giới hạn.*

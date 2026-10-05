@echo off
chcp 65001 >nul
title FinFlow - Mở Link Online Công Khai Toàn Cầu
echo ============================================================
echo   FINFLOW - MỞ LINK ONLINE CÔNG KHAI TOÀN CẦU (HTTPS)
echo ============================================================
echo.
echo Đang kiểm tra kết nối máy chủ FinFlow trên cổng 3000...
echo.

REM Kiểm tra cloudflared có sẵn không
where cloudflared >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Đã phát hiện Cloudflare Tunnel! Đang tạo đường link HTTPS miễn phí...
    echo.
    echo LINK TRUY CẬP CÔNG KHAI SẼ HIỆN Ở DƯỚI (dạng https://...trycloudflare.com):
    echo (Bất kỳ ai ở bất kỳ đâu trên thế giới đều có thể truy cập được link này)
    echo.
    cloudflared tunnel --url http://localhost:3000
    goto end
)

REM Thử qua npx localtunnel nếu có Node.js / npx
where npx >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Đang khởi chạy qua Localtunnel (HTTPS toàn cầu)...
    echo.
    echo Hãy mở trình duyệt và truy cập link được cấp:
    call npx localtunnel --port 3000
    goto end
)

echo [HƯỚNG DẪN] Để mở link online trực tiếp từ máy tính:
echo 1. Tải công cụ miễn phí Cloudflared: https://github.com/cloudflare/cloudflared/releases/latest
echo    (Tải file cloudflared-windows-amd64.exe và đổi tên thành cloudflared.exe)
echo 2. Đặt file cloudflared.exe vào cùng thư mục này và chạy lại file run-online-tunnel.bat.
echo.
echo Hoặc tải mã nguồn lên Render.com / Railway.app để có link vĩnh viễn 24/7 không cần bật máy tính!
echo.
pause

:end

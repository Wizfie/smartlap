@echo off
echo ========================================================
echo   SmartLap - Menjalankan Cloudflare Tunnel ke Frontend
echo   Frontend Port: 5174 (Otomatis proxy API ke Backend 5001)
echo ========================================================
echo.
cloudflared tunnel --protocol http2 --url http://localhost:5174
pause

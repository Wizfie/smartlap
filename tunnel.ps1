Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  SmartLap - Menjalankan Cloudflare Tunnel ke Frontend" -ForegroundColor Green
Write-Host "  Frontend Port: 5174 (Otomatis proxy API ke Backend 5001)" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

cloudflared tunnel --protocol http2 --url http://localhost:5174

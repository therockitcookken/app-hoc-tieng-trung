@echo off
title App Hoc Tieng Trung - Standalone Server
cd /d "%~dp0"
echo ==================================================
echo   DANG KHOI CHAY APP HOC TIENG TRUNG (PORT 3000)
echo ==================================================
echo Ung dung dang chay tai: http://localhost:3000/dictionary
echo Mo trinh duyyet web...
start "" "http://localhost:3000/dictionary"
node server.js
pause

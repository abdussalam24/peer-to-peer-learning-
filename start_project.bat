@echo off
echo ========================================
echo Starting Peer-to-Peer Learning Platform
echo ========================================
echo.

REM Check if .env exists
if not exist "server\.env" (
    echo [WARNING] .env file not found!
    echo Creating .env from .env.example...
    copy server\.env.example server\.env >nul 2>&1
    echo [OK] .env file created
    echo.
)

cd server
echo [1/4] Installing Server Dependencies...
call npm install >nul 2>&1
echo [OK] Server dependencies ready
echo.

echo [2/4] Starting Backend Server...
start "P2P Server" cmd /c "cd /d %CD% && npm run dev"
timeout /t 3 /nobreak >nul

cd ..\client
echo [3/4] Installing Client Dependencies...
call npm install >nul 2>&1
echo [OK] Client dependencies ready
echo.

echo [4/4] Starting Frontend Client...
start "P2P Client" cmd /c "cd /d %~dp0client && npm run dev"

echo.
echo ========================================
echo Project is starting...
echo ========================================
echo Server: http://localhost:5000
echo Client: http://localhost:5173
echo.
echo Check the opened terminal windows for status
echo Press Ctrl+C in those windows to stop the servers
echo.
pause

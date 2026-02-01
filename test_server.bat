@echo off
echo Checking Server Status...
echo.

echo Testing if server is running on port 5000...
curl -s http://localhost:5000 >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Server is running
    curl http://localhost:5000
) else (
    echo [ERROR] Server is NOT running on port 5000
    echo Please start the server using: cd server ^&^& npm run dev
)

echo.
echo.
echo Testing registration endpoint...
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"test123\",\"role\":\"learner\"}"

echo.
echo.
pause

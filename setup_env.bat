@echo off
echo Setting up environment configuration...
echo.

cd server

REM Check if .env already exists
if exist .env (
    echo .env file already exists. Creating backup...
    copy .env .env.backup >nul 2>&1
    echo Backup created as .env.backup
)

REM Copy .env.example to .env
echo Creating .env file from .env.example...
copy .env.example .env >nul 2>&1

if %errorlevel% equ 0 (
    echo [SUCCESS] .env file created successfully!
    echo.
    echo MongoDB Atlas connection configured.
    echo.
    echo Now restart your server:
    echo   1. Close the existing server terminal if running
    echo   2. Run: cd server ^&^& npm run dev
    echo.
    echo Or use the start_project.bat script to restart both client and server.
) else (
    echo [ERROR] Failed to create .env file
)

echo.
pause

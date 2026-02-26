@echo off
echo ========================================
echo Gousamhitha Backend Startup
echo ========================================
echo.

echo Step 1: Checking environment configuration...
if not exist ".env.supabase" (
    echo WARNING: .env.supabase not found!
    echo Please copy .env.example to .env.supabase and configure it.
    pause
    exit /b 1
)
echo Environment file found!
echo.

echo Step 2: Checking if node_modules exists...
if not exist "node_modules" (
    echo node_modules not found! Installing dependencies...
    call npm install
) else (
    echo node_modules found!
)
echo.

echo Step 3: Starting server...
echo.
node server.js

pause

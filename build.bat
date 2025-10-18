@echo off
echo Building project...
call "node_modules\.bin\vite.cmd" build
if %errorlevel% neq 0 (
    echo Build failed
    exit /b 1
)
echo Build completed successfully

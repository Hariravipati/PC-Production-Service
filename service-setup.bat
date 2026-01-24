@echo off
echo Setting up OnBoarding Service as Windows Service...
echo.

echo Step 1: Installing dependencies...
npm install

echo.
echo Step 2: Building the application...
npm run build

echo.
echo Step 3: Installing Windows service...
echo Note: This requires Administrator privileges
npm run service:install

echo.
echo Service setup complete!
echo You can manage the service through Windows Services (services.msc)
echo Service Name: OnBoarding Service
echo.
pause
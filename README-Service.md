# Windows Service Setup for OnBoarding Service

## Quick Setup

1. **Run as Administrator**: Right-click Command Prompt and select "Run as administrator"
2. **Navigate to project directory**: `cd "d:\Learning\Type script\On-Boarding-Service"`
3. **Run setup script**: `service-setup.bat`

## Manual Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Application
```bash
npm run build
```

### 3. Install Service (Run as Administrator)
```bash
npm run service:install
```

### 4. Uninstall Service (if needed)
```bash
npm run service:uninstall
```

## Service Management

- **Service Name**: OnBoarding Service
- **Access URL**: http://localhost:3000
- **Swagger UI**: http://localhost:3000/api

### Using Windows Services Manager
1. Press `Win + R`, type `services.msc`
2. Find "OnBoarding Service"
3. Right-click to Start/Stop/Restart

### Using Command Line
```bash
# Start service
net start "OnBoarding Service"

# Stop service
net stop "OnBoarding Service"
```

## Important Notes

- Service installation requires **Administrator privileges**
- The service will automatically start on Windows boot
- Logs are managed by Windows Event Viewer
- Service runs in production mode (NODE_ENV=production)
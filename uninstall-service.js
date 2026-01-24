const Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
const svc = new Service({
  name: 'OnBoarding Service',
  description: 'NestJS OnBoarding Service for Windows',
  script: path.join(__dirname, 'dist', 'main.js')
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', function() {
  console.log('OnBoarding Service uninstalled successfully!');
});

// Uninstall the service.
console.log('Uninstalling OnBoarding Service...');
svc.uninstall();
const Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
const svc = new Service({
  name: 'OnBoarding Service',
  description: 'NestJS OnBoarding Service for Windows',
  script: path.join(__dirname, 'dist', 'main.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ],
  env: {
    name: "NODE_ENV",
    value: "production"
  }
});

// Listen for the "install" event, which indicates the process is available as a service.
svc.on('install', function() {
  console.log('OnBoarding Service installed successfully!');
  console.log('Starting the service...');
  svc.start();
});

svc.on('alreadyinstalled', function() {
  console.log('OnBoarding Service is already installed.');
});

svc.on('start', function() {
  console.log('OnBoarding Service started successfully!');
  console.log('Service is now running on http://localhost:3000');
});

// Install the service
console.log('Installing OnBoarding Service...');
svc.install();
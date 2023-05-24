
const http = require('http');

// Read the backend hostname and port from environment variables
const backendHostname = process.env.BACKEND_HOSTNAME; // Set the environment variable to the actual backend hostname
const backendPort = process.env.BACKEND_PORT; // Set the environment variable to the actual backend port

// Define the API endpoint on the back-end container
const apiEndpoint = '/api';

// JSON data to send in the request body
const jsonData = {
  key1: 'value1',
  key2: 'value2'
};

// Convert the JSON data to a string
const jsonDataString = JSON.stringify(jsonData);

// Create an HTTP request options object
const options = {
  hostname: backendHostname,
  port: backendPort,
  path: apiEndpoint,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(jsonDataString)
  }
};

// Send an HTTP request to the back-end container
const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    // Process the response from the back-end container
    console.log('Response from back-end:', data);
  });
});

req.on('error', (error) => {
  console.error('Error connecting to back-end:', error);
});

// Send the JSON data in the request body
req.write(jsonDataString);

req.end();
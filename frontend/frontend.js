const http = require('http');
const { config } = require('dotenv');

config(); // load the .env

const port = process.env.FRONTEND_PORT;
const backendHostname = process.env.BACKEND_HOSTNAME;
const backendPort = process.env.BACKEND_PORT;

if (!port || !backendHostname || !backendPort) {
  console.error('Error: Missing environment variables. Please set PORT and BACKEND_HOSTNAME and BACKEND_PORT.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/sendData' && req.method === 'POST') {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const jsonData = JSON.parse(data);

        // Send data to the backend
        sendDataToBackend(jsonData)
          .then(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Data sent to the backend successfully.' }));
          })
          .catch((error) => {
            console.error('Error occurred while sending data to the backend:', error.message);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'An error occurred while sending data to the backend.' }));
          });
      } catch (error) {
        console.error('Error occurred while parsing JSON data:', error.message);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid JSON data.' }));
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not found.' }));
  }
});

function sendDataToBackend(data) {
  return new Promise((resolve, reject) => {
    // You can perform the necessary action to send the data to the backend here
    // Replace this with your actual implementation

    // Example implementation using console.log
    console.log('Sending data to the backend:', data);

    // Assuming the data is sent successfully
    resolve();
  });
}

server.listen(port, () => {
  console.log(`Frontend server is running on port ${port}`);
});

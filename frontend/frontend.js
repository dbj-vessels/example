const http = require('http');
const { config } = require('dotenv');
const axios = require('axios');

config(); // load the .env

const port = process.env.FRONTEND_PORT;
const backendHostname = process.env.BACKEND_HOSTNAME;
const backendPort = process.env.BACKEND_PORT;

if (!port || !backendHostname || !backendPort) {
  console.error('Error: Missing environment variables. Please set PORT and BACKEND_HOSTNAME and BACKEND_PORT.');
  process.exit(1);
}


const data = {
  PTO: 'Australia',
  currency: 'AUD'
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('Sleeping for 3 seconds...');
  await sleep(3000);

  console.log('Sending to: http://' + backendHostname + ':' + backendPort + '/api/endpoint\n\ndata: ', JSON.stringify(data));

  axios.post(`http://${backendHostname}:${backendPort}/api/endpoint`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


const server = http.createServer((req, res) => { /* */ });

server.listen(port, () => {
  console.log(`Frontend server is running on port ${port}`);
});

main();


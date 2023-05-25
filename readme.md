# Multi container project

*This project is W.I.P.*

> Purpose of this repo is to show the "proper" way of "doing things"

For starters organize your multi container projects like this one is:

```bat
.
├───backend
├───docs
└───frontend
```
- each container in a separate folder
- keep the `Dockerfile`s in them individual container folders: `backend` and `frontend`
- `docker-compose.yaml` keep in the root folder
- create and use the simple script (`decoupled_build.cmd` in this case) to remove and restart building your compose app.

```bat
@echo off
set BACKEND_PORT=3000
set BACKEND_HOSTNAME=backend
set FRONTEND_PORT=8282
set FRONTEND_HOSTNAME=frontend
@REM first remove the previous 
docker-compose down --rmi all
@REM now build and start 
@REM -d for daemon is optional
docker-compose up -d
```

- Be sure to read and understand https://www.webmound.com/nodejs-environment-variables/.
- in here I use the `.env` files, you do not have to.

## Configurations

Create a JSON file, such as config.json, and define your configuration variables and values:

```json
{
  "database": {
    "host": "localhost",
    "port": 27017,
    "username": "admin",
    "password": "password"
  },
  "server": {
    "port": 3000,
    "secretKey": "mysecretkey"
  }
}
```

Read this JSON file in your Node.js application using the require function:

```js
const config = require('./config.json');

console.log(config.database.host); // localhost
console.log(config.server.port); // 3000
```

That snippet also ilustrates the applicability of the NODE js to the JSON handling.  To do the same from any other language will require mnore or much more lines of code, to the same effect.


### Configuration Modules

One can create a configuration module that exports the configuration variables as an object. This allows JavaScript code to handle complex configurations.

For example, create a config.js file:

```js
const databaseHost = 'localhost';
const databasePort = 27017;
const serverPort = process.env.PORT || 3000;

module.exports = {
  database: {
    host: databaseHost,
    port: databasePort
  },
  server: {
    port: serverPort
  }
};
```
Now import this configuration module in your application:
```js
const config = require('./config.js');
console.log(config.database.host); // localhost
console.log(config.server.port); // 3000 or the value of PORT environment variable
```
Again an good ilustration of applicability of NODE js to manage dynamic code. In JS object and JSON are (almost) the same thing. `config.js` can be easily rewritten as JSON, but this way we did a shortcut to instantly have objects and constants we need.

# How to organize, configure and deploy an Docker compose project

> Purpose of this repo is to show the "proper" way of "doing things" for Docker compose app's. Not to teach the "proper" coding.

## Repository organization

For starters organize your multi container projects with the root folder and subfolders; one for each container. This repository  folder structure is:

```js
.
├───backend             // container
├───environprinter      // container
├───docs                // not a container
└───frontend            // container
```
- each container code is in a separate folder
- keep the `Dockerfile`s in them individual container folders
- `docker-compose.yaml` is in the root folder
- create and use the simple script (`decoupled_build.cmd` in this case) to remove and restart deploying your compose app.

```bat
@echo off
@REM first remove the previous 
docker-compose down --rmi all
@REM now build and start 
@REM -d for daemon is optional arguments bellow
docker-compose up
```

## .env files

Usually deployment scripts and source code are externally configured.And there are .env files as an universally accepted solution. News to you? Please be sure to detour over here before proceeding:

1. [Are .env files safe?](docs/env_files.md)
2. [How are good teams handling .env files](https://github.com/acaloiaro/env-sample-sync)

- In here we have very simple windows desktop docker compose app deployment
- for the time being we will not separately deploy non prod and prod code

## Docker compose apps and configuration

- WARNING: Often the literature mixes OS environment variables and Docker environment variables
  - be sure to understand they are different 'things'
- in here I avoid the confusion by not using the OS env vars
- I use only `.env` files
  - I create env vars in docker-compose and docker files
  - I do strongly advise against mixing 
    - ditto: only one `.env` file 
    - used only by the one top level `docker-compose.yaml`
    - env vars passed down from it to the docker files 
  - added complexity (confusion) comes from the fact `.env` files can be read from the source code
  - simply do not do that, keep separate configurations in separate language specific configuration files 
      - see the node js examples bellow
- Be sure to read and understand the comments in the simple source files in this repo
  - especially the ones about `.env` files
- purpose of the source in here is to show the recommended organization of the multi container project organization and configurations
  - not the "best" algorithms and such

## Node JS Configurations

> NOTE: this is not docker or OS environment variables.  

Example. Create a JSON file, such as `config.json`, and define your configuration variables and values:

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

That snippet also illustrates the applicability of the NODE js to the JSON handling.  To do the same from any other language will require (much) more lines of code, to the same effect. Yes Python including. Nothing beats javascript when it comes to json.

## Node js Configuration Modules

One can create a node js configuration module that exports the configuration variables as an object. This allows JavaScript code to handle complex configurations as if they are objects and constants in the code.

For example, create a `config.js` file representing one node js module:

```js
// config.js
const databaseHost = 'localhost';
const databasePort = 27017;

// we use the env vars from the Dockerfile 
// that has been given the .env defined vars
// used by the docker-compose above it
const serverPort = process.env.BACKEND_PORT ;
// do not do this bellow, is is a quiet error anti pattern!
// const serverPort = process.env.PORT || 3000;
// instead signal the error and exit, as bellow
if (!process.env.BACKEND_PORT) {
    console.error('Error from config.js module: BACKEND_PORT environment variable is not defined?');
    process.exit(1); // Exit the process with a non-zero status code
}

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
Now simply require this configuration module in your application:
```js
const config = require('./config.js');
console.log(config.database.host); // localhost
console.log(config.server.port); // the value of BACKEND_PORT environment variable
```

> Importantly using that configuration mechanism, we are not confusing ourselves (and reviewers) by using the `.env` files, for other purposes, hidden in the source code.

---

***This project is W.I.P.***

(c) dbj@dbj.org CC BY SA 4.0

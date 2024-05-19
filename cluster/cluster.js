// (c) dbj@dbj.org CC BY SA 4.0

// to use local .env file
// in the Dockerfile: RUN npm install dotenv
// const { config } = require('dotenv');
// config(); // load the .env file
// STOP AND THINK
// local (per container) .env files confuse devops 
// who are supposed to deploy 
// for local config use whatever else you can 
// basically let the docker compose script be the
// only one where environment is setup and coming from

const cluster = require('cluster');
const os = require('os');
const sleep = require('./sleep');
const logger = require('./logger');


async function run() {
    if (cluster.isMaster) {
        // This is the master process **********************************************************
        logger.info('                                                                 ');
        logger.info('                                                                 ');
        logger.info('This is CLUSTER MASTER               ****************************');
        logger.info(`Process ID: ${process.pid}           ****************************`);
        
        logger.info('This is an informational log message ****************************');
        logger.warn('This is a warning log message ***********************************');
        logger.error('This is an error log message ***********************************');
        logger.info('                                                                 ');
        logger.info('                                                                 ');

        // Get the number of CPU cores
        const numCPUs = os.cpus().length;
        logger.info(`Number of cores found: ${numCPUs}`);
        logger.info(`Will start one worker per core.`);
        logger.info('                                                                 ');
        logger.info('                                                                 ');

        // Fork worker processes
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
            logger.info(`Forked worker process No: ${i}`);
        }
        // Listen for messages from the worker process
        cluster.on('message', (worker, message) => {
            logger.info(`Received message from worker ${worker.process.pid}: ${message}`);
            logger.info('                                                                 ');
        });

        // Listen for the exit event of worker processes
        cluster.on('exit', (worker, code, signal) => {
            logger.warn(`Worker PID: [${worker.process.pid}] died`);
            // Fork a new worker to replace the dead one
            cluster.fork();
            logger.info(`Forked a new worker to replace the dead one`)
        });

        // Handle the termination signal on the whole cluster
        process.on('SIGINT', () => {
            logger.warn('SIGINT received. Terminating the cluster...');
            // Stop the worker processes
            // Send 'exit' message to each worker process
            workers.forEach(worker => {
                logger.warn(`Sent the 'exit' message to the worker PID: [${worker.PID}]`);
                worker.send('exit');
            });
            // Exit the master process
            logger.warn('Exiting the master process');
            process.exit();
        });

    } else {
        // This is a worker process ******************************************************************
        // Start your worker logic here
        // Environment 
        const cluster_sleep = process.env.CLUSTER_SLEEP;
        if (!cluster_sleep) throw Error("CLUSTER_SLEEP is empty")
        const sleeping_time =
            logger.info(`Worker PID: [${process.pid}] started`);
        await sleep(cluster_sleep);

        // Send a message to the master process
        process.send(`Hello from worker PID: [${process.pid}], I am ready and awake after ${cluster_sleep / 1000} seconds sleep.`);

        // Listen for messages from the master process
        process.on('message', (message) => {
            if (message === 'exit') {
                console.warn(`Worker ${process.pid} received exit message.Exiting...`);
                // Exit the worker process
                process.exit();
            }
        });

    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
run();
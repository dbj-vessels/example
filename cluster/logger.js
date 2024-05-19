const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
    level: 'info', // Set the log level (e.g., 'info', 'debug', 'warn', 'error')
    format: winston.format.combine(
        /* winston.format.timestamp(),*/
        winston.format.printf(({ /*timestamp,*/ level, message }) => {
            return `[${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console() // Log to the console
        // , new winston.transports.File({ filename: 'app.log' }) // Log to a file
    ]
});

module.exports = logger;

// const logger = require('./logger');
// logger.info('This is an informational message');
// logger.warn('This is a warning message');
// logger.error('This is an error message');

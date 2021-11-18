const winston = require('winston')
require('winston-daily-rotate-file');

const myFormat = winston.format.combine(
    winston.format.label({ label: 'express' }),
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`
    }),
    // winston.format.prettyPrint() // json 형식처럼 프린트해준다.
)
  
const options = {
    info: {
        level: 'info',
        dirname: 'logs',
        filename: `%DATE%_combined.log`,
        datePattern: 'YYYY-MM-DD',
        handleExceptions: true,
        json: false,
        zippedArchive: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: myFormat,
    },
    error: {
        level: 'error',
        dirname: 'logs',
        filename: `%DATE%_error.log`,
        datePattern: 'YYYY-MM-DD',
        handleExceptions: true,
        json: false,
        zippedArchive: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
        format: myFormat,
    },
}

const logger = winston.createLogger({
    level: 'info',
    format: myFormat,
    transports: [
        new winston.transports.DailyRotateFile(options.info), // Write all logs with level `info` and below to `combined.log` 
        new winston.transports.DailyRotateFile(options.error), // Write all logs with level `error` and below to `error.log`
    ],
});
  
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.colorize({ all: true }),
    }));
}

module.exports = logger;
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info', // minimum level to log
  levels: {
    critical: 0,
    error: 1,
    info: 2
  },
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) =>
      `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/test.log' })
  ]
});

module.exports = logger;

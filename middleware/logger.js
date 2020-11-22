const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint, simple } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  defaultMeta: { service: process.env.APP_NAME },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'warn' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: simple()
  }));
  logger.add(new transports.File({ filename: 'logs/combined.log' }));
}

module.exports = logger;
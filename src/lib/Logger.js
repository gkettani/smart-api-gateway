import winston from 'winston';

/**
 * Log format
 */
const logFormat = winston.format.printf(
  ({ level, message, timestamp }) => `${level}: ${timestamp}  ${message}`,
);

/**
 * Logger configuration
 * @param env - Node environment (development, production, test)
 * @returns winston logger
 */
export function Logger(env = 'development', logDir = 'logs') {
  const level = env === 'development' ? 'debug' : 'info';

  const transports = [];

  const formatParams = [winston.format.timestamp({ format: 'HH:mm:ss' }), logFormat];

  if (env === 'production') {
    transports.push(new winston.transports.File({ filename: `${logDir}/combined.log` }));
    transports.push(new winston.transports.File({ filename: `${logDir}/error.log`, level: 'error' }));
  } else {
    formatParams.push(winston.format.colorize());
    transports.push(new winston.transports.Console());
  }
  const format = winston.format.combine(...formatParams);

  return winston.createLogger({
    level,
    format,
    transports,
  });
}

/**
 * @param args Utilitary function to join arguments into a string
 * @returns string
 */
function joinArgs(...args) {
  return args.map((arg) => JSON.stringify(arg)).join(' ');
}

/**
 * Logger wrapper to use multiple args instead of a single string
 * @param logger - winston logger instance
 * @returns logger wrapper
 */
export const loggerWrapper = (logger) => ({
  error: (...args) => logger.error(joinArgs(...args)),
  warn: (...args) => logger.warn(joinArgs(...args)),
  debug: (...args) => logger.debug(joinArgs(...args)),
  info: (...args) => logger.info(joinArgs(...args)),
  notice: (...args) => logger.notice(joinArgs(...args)),
  crit: (...args) => logger.crit(joinArgs(...args)),
  alert: (...args) => logger.alert(joinArgs(...args)),
  emerg: (...args) => logger.emerg(joinArgs(...args)),
});

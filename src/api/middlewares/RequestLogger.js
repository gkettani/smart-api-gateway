import logger from '../../config/logger.js';

export default function RequestLogger(req, _res, next) {
  logger.info(`${req.method} ${req.url}`);
  next();
}

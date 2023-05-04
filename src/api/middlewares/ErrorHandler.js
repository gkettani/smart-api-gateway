import { ApiError } from '../../config/errors/index.js';
import logger from '../../config/logger.js';
import HTTP_STATUS from '../../lib/httpStatusCode.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ErrorHandler(err, _req, res, _) {
  logger.error(err.message);
  if (err instanceof ApiError) {
    const message = process.env.NODE_ENV === 'production' ? 'Error' : err.message;
    res.status(err.statusCode).json({
      message,
      name: err.name,
    });
    return;
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    name: err.name,
  });
}

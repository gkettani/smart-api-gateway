import HTTP_STATUS from '../../lib/httpStatusCode.js';
import ApiError from './ApiError.js';

export default class BadRequestError extends ApiError {
  constructor(message, name = 'Not Found') {
    super(HTTP_STATUS.NOT_FOUND, message, name);
  }
}

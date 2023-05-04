import HTTP_STATUS from '../../lib/httpStatusCode.js';
import ApiError from './ApiError.js';

export default class BadRequestError extends ApiError {
  constructor(message, name = 'Unauthorized') {
    super(HTTP_STATUS.UNAUTHORIZED, message, name);
  }
}

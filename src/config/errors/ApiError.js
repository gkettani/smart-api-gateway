export default class ApiError extends Error {
  constructor(statusCode, message, name) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = name;
    Error.captureStackTrace(this, this.constructor);
  }
}

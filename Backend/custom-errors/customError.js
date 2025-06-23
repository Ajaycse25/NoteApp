class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Indicates that this error is expected and handled
  }
}

class ValidationError extends CustomError {
  constructor(message) {
    super(message, 400); // Bad Request
    this.name = 'ValidationError';
  }
}

class BadRequestError extends CustomError {
  constructor(message) {
    super(message, 400); // Bad Request
    this.name = 'BadRequestError';
  }
}
module.exports = {CustomError, ValidationError, BadRequestError};
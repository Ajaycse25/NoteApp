const {CustomError} = require('../custom-errors/customError');

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    // Handle custom application-defined errors
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'An error occurred',
      error: err.name || 'CustomError',
    });
  }

  // Log unexpected errors for debugging
  console.error('Unexpected error:', err);

  // Handle all other errors (fallback)
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message || 'Something went wrong!',
  });
};

module.exports = errorMiddleware;

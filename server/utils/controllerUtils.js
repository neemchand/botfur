const { getMessage } = require('./messages');

function asyncHandler(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

function createErrorResponse(messageKey, statusCode = 500) {
  const error = new Error(getMessage(messageKey));
  error.statusCode = statusCode;
  error.messageKey = messageKey;
  return error;
}

function successResponse(res, data, messageKey) {
  return res.json({
    success: true,
    message: getMessage(messageKey),
    ...data
  });
}

module.exports = {
  asyncHandler,
  createErrorResponse,
  successResponse
};
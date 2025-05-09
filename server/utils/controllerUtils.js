
/**
 * Wraps controller functions to handle async errors
 * @param {Function} fn - The async controller function
 * @returns {Function} - Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Creates a standardized error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {Error} - Error object with message and status code
 */
const createErrorResponse = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Sends a standardized success response
 * @param {object} res - Express response object
 * @param {object} data - Data to include in the response
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code
 */
const successResponse = (res, data = {}, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    ...data
  });
};

module.exports = {
  asyncHandler,
  createErrorResponse,
  successResponse
};

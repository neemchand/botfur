const { param, validationResult } = require('express-validator');

// Common validation rules that apply across multiple routes
const userIdValidationRules = [
  param('userId')
    .exists().withMessage('User ID is required')
    .isString().withMessage('User ID must be a string')
    .trim()
    .notEmpty().withMessage('User ID cannot be empty')
];

// Generic validation middleware
function validate(req, res, next) {
  const errors = validationResult(req);
  console.log('Validation errors:', errors.array());
  if (errors.isEmpty()) {
    return next();
  }
  
  const extractedErrors = errors.array().map(err => err.msg);
  const error = new Error(extractedErrors.join('. '));
  error.statusCode = 400;
  next(error);
}

module.exports = {
  userIdValidationRules,
  validate
};
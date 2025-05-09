const { body } = require('express-validator');
const { PetType } = require('../../constants/petTypes');

// Pet-specific validation rules
const petValidationRules = [
  body('name')
    .exists().withMessage('Pet name is required')
    .isString().withMessage('Pet name must be a string')
    .trim()
    .isLength({ min: 2, max: 20 }).withMessage('Pet name must be between 2 and 20 characters'),
  
  body('type')
    .exists().withMessage('Pet type is required')
    .isString().withMessage('Pet type must be a string')
    .custom(value => {
      if (!Object.values(PetType).includes(value)) {
        throw new Error(`Invalid pet type. Must be one of: ${Object.values(PetType).join(', ')}`);
      }
      return true;
    }),
  
  body('stats.hunger')
    .optional()
    .isNumeric().withMessage('Hunger must be a number')
    .isFloat({ min: 0, max: 100 }).withMessage('Hunger must be between 0 and 100'),
  
  body('stats.happiness')
    .optional()
    .isNumeric().withMessage('Happiness must be a number')
    .isFloat({ min: 0, max: 100 }).withMessage('Happiness must be between 0 and 100'),
  
  body('stats.energy')
    .optional()
    .isNumeric().withMessage('Energy must be a number')
    .isFloat({ min: 0, max: 100 }).withMessage('Energy must be between 0 and 100'),
  
  body('stats.cleanliness')
    .optional()
    .isNumeric().withMessage('Cleanliness must be a number')
    .isFloat({ min: 0, max: 100 }).withMessage('Cleanliness must be between 0 and 100')
];

module.exports = {
  petValidationRules
};
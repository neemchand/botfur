const express = require('express');
const router = express.Router();
const petController = require('./controller');
const { userIdValidationRules, validate } = require('../../middleware/commonValidation');
const { petValidationRules } = require('./validation');

// Log routes for debugging
console.log('Registering pet routes...');

router.get(
  '/:userId',
  userIdValidationRules,
  validate,
  petController.getPet
);

router.post(
  '/:userId',
  userIdValidationRules,
  petValidationRules,
  validate,
  petController.createOrUpdatePet
);

router.delete(
  '/:userId',
  userIdValidationRules,
  validate,
  petController.deletePet
);

router.post(
  '/:userId/feed',
  userIdValidationRules,
  validate,
  petController.feedPet
);

router.post(
  '/:userId/play',
  userIdValidationRules,
  validate,
  petController.playWithPet
);

router.post(
  '/:userId/clean',
  userIdValidationRules,
  validate,
  petController.cleanPet
);

// Log controller methods for debugging
console.log('Pet controller methods:', Object.keys(petController));

module.exports = router;

const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.get('/:userId', petController.getPet);
router.post('/:userId', petController.createOrUpdatePet);
router.delete('/:userId', petController.deletePet);

router.post('/:userId/feed', petController.feedPet);
router.post('/:userId/play', petController.playWithPet);
router.post('/:userId/clean', petController.cleanPet);

module.exports = router;

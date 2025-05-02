const petService = require('../services/petService');
const { asyncHandler, createErrorResponse, successResponse } = require('../utils/controllerUtils');

const getPet = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const pet = await petService.getPetByUserId(userId);
  res.json({ pet });
});

const createOrUpdatePet = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const petData = req.body;
  const pet = await petService.savePet(userId, petData);
  
  const isNew = !req.body.id;
  const messageKey = isNew ? 'success.pet.created' : 'success.pet.updated';
  
  successResponse(res, { pet }, messageKey);
});

const deletePet = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  await petService.removePet(userId);
  successResponse(res, {}, 'success.pet.deleted');
});

const feedPet = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const pet = await petService.feedPet(userId);
  
  if (!pet) {
    throw createErrorResponse('errors.pet.notFound', 404);
  }
  
  successResponse(res, { pet }, 'success.pet.fed');
});

const playWithPet = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const pet = await petService.playWithPet(userId);
  
  if (!pet) {
    throw createErrorResponse('errors.pet.notFound', 404);
  }
  
  successResponse(res, { pet }, 'success.pet.played');
});

const cleanPet = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const pet = await petService.cleanPet(userId);
  
  if (!pet) {
    throw createErrorResponse('errors.pet.notFound', 404);
  }
  
  successResponse(res, { pet }, 'success.pet.cleaned');
});

module.exports = {
  getPet,
  createOrUpdatePet,
  deletePet,
  feedPet,
  playWithPet,
  cleanPet
};

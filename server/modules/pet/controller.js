
const petService = require('./service');
const { asyncHandler, createErrorResponse, successResponse } = require('../../utils/controllerUtils');

const getPet = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const pet = await petService.getPetByUserId(userId);
  if (!pet) {
    throw createErrorResponse('Pet not found', 404);
  }
  
  successResponse(res, { pet });
});

const createOrUpdatePet = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const petData = req.body;
  const pet = await petService.savePet(userId, petData);
  
  const isNew = !req.body.id;
  const message = isNew ? 'Pet created successfully' : 'Pet updated successfully';
  
  successResponse(res, { pet }, message);
});

const deletePet = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const success = await petService.removePet(userId);
  
  if (!success) {
    throw createErrorResponse('Pet not found', 404);
  }
  
  successResponse(res, {}, 'Pet deleted successfully');
});

const feedPet = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const pet = await petService.feedPet(userId);
  
  if (!pet) {
    throw createErrorResponse('Pet not found', 404);
  }
  
  successResponse(res, { pet }, 'Pet fed successfully');
});

const playWithPet = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const pet = await petService.playWithPet(userId);
  
  if (!pet) {
    throw createErrorResponse('Pet not found', 404);
  }
  
  successResponse(res, { pet }, 'Pet played with successfully');
});

const cleanPet = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const pet = await petService.cleanPet(userId);
  
  if (!pet) {
    throw createErrorResponse('Pet not found', 404);
  }
  
  successResponse(res, { pet }, 'Pet cleaned successfully');
});

module.exports = {
  getPet,
  createOrUpdatePet,
  deletePet,
  feedPet,
  playWithPet,
  cleanPet
};

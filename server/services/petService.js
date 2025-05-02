const petModel = require('../models/petModel');

async function getPetByUserId(userId) {
  const data = await petModel.readPetData();
  return data[userId] || null;
}

async function savePet(userId, petData) {
  const data = await petModel.readPetData();
  data[userId] = petData;
  await petModel.writePetData(data);
  return petData;
}

async function removePet(userId) {
  const data = await petModel.readPetData();
  
  if (data[userId]) {
    delete data[userId];
    await petModel.writePetData(data);
    return true;
  }
  return false;
}

async function feedPet(userId) {
  const data = await petModel.readPetData();
  const pet = data[userId];
  
  if (!pet) {
    return null;
  }
  
  const currentHunger = pet.stats.hunger;
  const happinessBoost = currentHunger > 80 ? 20 : 10;
  
  pet.stats.hunger = Math.max(0, pet.stats.hunger - 20);
  pet.stats.happiness = Math.min(100, pet.stats.happiness + happinessBoost);
  pet.stats.energy = Math.min(100, pet.stats.energy + 5);
  pet.lastInteraction = new Date();
  
  await petModel.writePetData(data);
  return pet;
}

async function playWithPet(userId) {
  const data = await petModel.readPetData();
  const pet = data[userId];
  
  if (!pet) {
    return null;
  }
  
  const isHungry = pet.stats.hunger > 80;
  const isTired = pet.stats.energy < 20;
  const happinessChange = (isHungry || isTired) ? -5 : 20;
  
  pet.stats.hunger = Math.min(100, pet.stats.hunger + 15);
  pet.stats.happiness = Math.min(100, Math.max(0, pet.stats.happiness + happinessChange));
  pet.stats.energy = Math.max(0, pet.stats.energy - 15);
  pet.stats.cleanliness = Math.max(0, pet.stats.cleanliness - 10);
  pet.lastInteraction = new Date();
  
  await petModel.writePetData(data);
  return pet;
}

async function cleanPet(userId) {
  const data = await petModel.readPetData();
  const pet = data[userId];
  
  if (!pet) {
    return null;
  }
  
  const happinessBoost = pet.stats.cleanliness < 20 ? 15 : 5;
  
  pet.stats.cleanliness = Math.min(100, pet.stats.cleanliness + 30);
  pet.stats.happiness = Math.min(100, pet.stats.happiness + happinessBoost);
  pet.stats.energy = Math.max(0, pet.stats.energy - 5);
  pet.lastInteraction = new Date();
  
  await petModel.writePetData(data);
  return pet;
}

module.exports = {
  getPetByUserId,
  savePet,
  removePet,
  feedPet,
  playWithPet,
  cleanPet
};
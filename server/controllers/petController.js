const petModel = require('../models/petModel');

async function getPet(req, res) {
  try {
    const { userId } = req.params;
    const data = await petModel.readPetData();
    res.json({ pet: data[userId] || null });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pet data' });
  }
}

async function createOrUpdatePet(req, res) {
  try {
    const { userId } = req.params;
    const petData = req.body;
    const data = await petModel.readPetData();
    
    data[userId] = petData;
    await petModel.writePetData(data);
    
    res.json({ success: true, pet: petData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save pet data' });
  }
}

async function deletePet(req, res) {
  try {
    const { userId } = req.params;
    const data = await petModel.readPetData();
    
    if (data[userId]) {
      delete data[userId];
      await petModel.writePetData(data);
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pet data' });
  }
}

async function feedPet(req, res) {
  try {
    const { userId } = req.params;
    const data = await petModel.readPetData();
    const pet = data[userId];
    
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    const currentHunger = pet.stats.hunger;
    const happinessBoost = currentHunger > 80 ? 20 : 10;
    
    pet.stats.hunger = Math.max(0, pet.stats.hunger - 20);
    pet.stats.happiness = Math.min(100, pet.stats.happiness + happinessBoost);
    pet.stats.energy = Math.min(100, pet.stats.energy + 5);
    pet.lastInteraction = new Date();
    
    await petModel.writePetData(data);
    res.json({ success: true, pet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to feed pet' });
  }
}

async function playWithPet(req, res) {
  try {
    const { userId } = req.params;
    const data = await petModel.readPetData();
    const pet = data[userId];
    
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
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
    res.json({ success: true, pet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to play with pet' });
  }
}

async function cleanPet(req, res) {
  try {
    const { userId } = req.params;
    const data = await petModel.readPetData();
    const pet = data[userId];
    
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    const happinessBoost = pet.stats.cleanliness < 20 ? 15 : 5;
    
    pet.stats.cleanliness = Math.min(100, pet.stats.cleanliness + 30);
    pet.stats.happiness = Math.min(100, pet.stats.happiness + happinessBoost);
    pet.stats.energy = Math.max(0, pet.stats.energy - 5);
    pet.lastInteraction = new Date();
    
    await petModel.writePetData(data);
    res.json({ success: true, pet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clean pet' });
  }
}

module.exports = {
  getPet,
  createOrUpdatePet,
  deletePet,
  feedPet,
  playWithPet,
  cleanPet
};
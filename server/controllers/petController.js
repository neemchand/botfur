const petService = require('../services/petService');

async function getPet(req, res) {
  try {
    const { userId } = req.params;
    const pet = await petService.getPetByUserId(userId);
    res.json({ pet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pet data' });
  }
}

async function createOrUpdatePet(req, res) {
  try {
    const { userId } = req.params;
    const petData = req.body;
    const pet = await petService.savePet(userId, petData);
    res.json({ success: true, pet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save pet data' });
  }
}

async function deletePet(req, res) {
  try {
    const { userId } = req.params;
    await petService.removePet(userId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pet data' });
  }
}

async function feedPet(req, res) {
  try {
    const { userId } = req.params;
    const pet = await petService.feedPet(userId);
    
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    res.json({ success: true, pet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to feed pet' });
  }
}

async function playWithPet(req, res) {
  try {
    const { userId } = req.params;
    const pet = await petService.playWithPet(userId);
    
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    res.json({ success: true, pet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to play with pet' });
  }
}

async function cleanPet(req, res) {
  try {
    const { userId } = req.params;
    const pet = await petService.cleanPet(userId);
    
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
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

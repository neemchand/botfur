const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, 'pets.json');

async function initDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    await fs.writeFile(DATA_FILE, JSON.stringify({}));
  }
}

async function readPetData() {
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

async function writePetData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

initDataFile().then(() => {
  app.get('/api/pets/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const data = await readPetData();
      res.json({ pet: data[userId] || null });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pet data' });
    }
  });

  app.post('/api/pets/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const petData = req.body;
      const data = await readPetData();
      
      data[userId] = petData;
      await writePetData(data);
      
      res.json({ success: true, pet: petData });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save pet data' });
    }
  });

  app.delete('/api/pets/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const data = await readPetData();
      
      if (data[userId]) {
        delete data[userId];
        await writePetData(data);
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete pet data' });
    }
  });

  app.post('/api/pets/:userId/feed', async (req, res) => {
    try {
      const { userId } = req.params;
      const data = await readPetData();
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
      
      await writePetData(data);
      res.json({ success: true, pet });
    } catch (error) {
      res.status(500).json({ error: 'Failed to feed pet' });
    }
  });

  app.post('/api/pets/:userId/play', async (req, res) => {
    try {
      const { userId } = req.params;
      const data = await readPetData();
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
      
      await writePetData(data);
      res.json({ success: true, pet });
    } catch (error) {
      res.status(500).json({ error: 'Failed to play with pet' });
    }
  });

  app.post('/api/pets/:userId/clean', async (req, res) => {
    try {
      const { userId } = req.params;
      const data = await readPetData();
      const pet = data[userId];
      
      if (!pet) {
        return res.status(404).json({ error: 'Pet not found' });
      }
      
      const happinessBoost = pet.stats.cleanliness < 20 ? 15 : 5;
      
      pet.stats.cleanliness = Math.min(100, pet.stats.cleanliness + 30);
      pet.stats.happiness = Math.min(100, pet.stats.happiness + happinessBoost);
      pet.stats.energy = Math.max(0, pet.stats.energy - 5);
      pet.lastInteraction = new Date();
      
      await writePetData(data);
      res.json({ success: true, pet });
    } catch (error) {
      res.status(500).json({ error: 'Failed to clean pet' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

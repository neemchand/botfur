const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'pets.json');

async function initDataFile() {
  try {
    const dataDir = path.dirname(DATA_FILE);
    try {
      await fs.access(dataDir);
    } catch (error) {
      await fs.mkdir(dataDir, { recursive: true });
    }
    
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

module.exports = {
  initDataFile,
  readPetData,
  writePetData
};

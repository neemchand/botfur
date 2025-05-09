const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/config');
const petRoutes = require('./modules/pet/routes');
const errorHandler = require('./middleware/errorHandler');
const { initDataFile } = require('./modules/pet/model');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/pets', petRoutes);

// Error handling
app.use(errorHandler);

// Initialize data file and start server
initDataFile()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize data file:', err);
    process.exit(1);
  });

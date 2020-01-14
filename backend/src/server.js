const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.json());
app.use(routes);

app.listen(3333);
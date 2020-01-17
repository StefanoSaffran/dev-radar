const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');
const logger = require('./utils/logger');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(config.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false,
  useCreateIndex: true, 
})
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
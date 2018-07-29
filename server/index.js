const express = require('express');
const cors = require('cors');
import { basketRouter } from './basket';

const app = express();
const port = 4000;

app.use(cors());

const initializeRoutes = app => {
  app.use('/api/basket', basketRouter)
};

initializeRoutes(app);

function runOnPort() {
  console.log(`Server running on port ${port}`);
  return port;
}

const server = app.listen(runOnPort());

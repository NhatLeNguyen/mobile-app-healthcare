import express from 'express';
import homeController from '../controller/homeController.js';
let router = express.Router();

const initWebRoute = (app) => {
  return app.use('/', router);
};

export default initWebRoute;

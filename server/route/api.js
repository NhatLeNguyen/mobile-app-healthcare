import express from 'express';
import apiController from '../controller/apiController.js';
let router = express.Router();
const initAPIRoute = (app) => {
  router.post('/savePracticeHistory', apiController.savePracticeHistory);
  router.get('/getDailyPracticeDetail', apiController.getDailyPracticeDetail)
  return app.use('/', router);
};

export default initAPIRoute;

import express from 'express';
import apiController from '../controller/apiController.js';
let router = express.Router();
const initAPIRoute = (app) => {
  router.post('/savePracticeHistory', apiController.savePracticeHistory);
  router.get('/getDailyPracticeDetail', apiController.getDailyPracticeDetail)
  router.get('/getWeeklyPracticeDetail', apiController.getWeeklyPracticeDetail)
  router.get('/getChallenge', apiController.getChallenge)
  router.get('/getChallengeMap', apiController.getChallengeMap)
  return app.use('/', router);
};

export default initAPIRoute;

import express from 'express';
import * as comicsController from '../controllers/comic.controller';

const router = express.Router();

router.route('/comic')
  .get(comicsController.findAll)
  .post(comicsController.save);

router.route('/comic/:id')
  .get(comicsController.findById)
  .put(comicsController.replace)
  .patch(comicsController.update)
  .delete(comicsController.delete);

export default router;

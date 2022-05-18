import { Router } from 'express';
import { check } from 'express-validator';
import { movieController } from '../controllers';

const router = Router();

router.post('', [check('title').notEmpty(), check('director').notEmpty()], movieController.createMovie);
router.put('/:movieId', movieController.updateMovie);
router.get('', movieController.getAllMovies);
router.get('/:movieId', movieController.getMovie);
router.delete('/:movieId', movieController.deleteMovie);

export default router;

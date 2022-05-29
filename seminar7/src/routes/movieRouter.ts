import { Router } from 'express';
import { check, query } from 'express-validator';
import { movieController } from '../controllers';

const router = Router();

router.post('', [check('title').notEmpty(), check('director').notEmpty()], movieController.createMovie);
router.put('/:movieId', movieController.updateMovie);
router.get('/search', movieController.searchMovie);
router.get('/:movieId', movieController.getMovie);
router.get('', movieController.getAllMovies);
router.delete('/:movieId', movieController.deleteMovie);

export default router;

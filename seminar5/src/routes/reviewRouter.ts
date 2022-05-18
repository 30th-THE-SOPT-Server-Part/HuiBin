import { Router } from 'express';
import { check } from 'express-validator';
import { reviewController } from '../controllers';

const router = Router();

router.post('/movies/:movieId', [check('writer').notEmpty(), check('title').notEmpty()], reviewController.createReview);
router.get('/movies/:movieId', reviewController.getReviews);

export default router;

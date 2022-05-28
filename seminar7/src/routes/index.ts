import { Router } from 'express';
import userRouter from './userRouter';
import reviewRouter from './reviewRouter';
import movieRouter from './movieRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/review', reviewRouter);
router.use('/movie', movieRouter);

export default router;

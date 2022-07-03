import { Router } from 'express';
import userRouter from './userRouter';
import reviewRouter from './reviewRouter';
import movieRouter from './movieRouter';
import fileRouter from './fileRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/review', reviewRouter);
router.use('/movie', movieRouter);
router.use('/file', fileRouter);

export default router;

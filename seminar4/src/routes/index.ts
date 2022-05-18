import { Router } from 'express';
import userRouter from './userRouter';
import reviewRouter from './reviewRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/review', reviewRouter);

export default router;

import { Router } from 'express';
import userRouter from './userRouter';
import blogRouter from './blogRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/blog', blogRouter);

export default router;

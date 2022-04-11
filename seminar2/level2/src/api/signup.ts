import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  return res.status(201).json({
    status: 201,
    message: '회원 가입 성공',
  });
});

export default router;

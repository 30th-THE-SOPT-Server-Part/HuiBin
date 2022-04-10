import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: '블로그 조회 성공',
  });
});

export default router;

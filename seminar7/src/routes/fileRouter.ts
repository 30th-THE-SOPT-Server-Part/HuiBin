import { Router } from 'express';
import { fileController } from '../controllers';
import { upload } from '../middlewares';

const router = Router();

router.post('/', upload.array('file'), fileController.uploadFiles);

export default router;

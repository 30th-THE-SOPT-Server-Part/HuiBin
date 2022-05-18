import { Router } from 'express';
import { userController } from '../controllers';

const router = Router();

router.post('', userController.createUser);
router.put('/:userId', userController.updateUser);
router.get('/:userId', userController.getUser);
router.delete('/:userId', userController.deleteUser);

export default router;

import { Router } from 'express';
import { check } from 'express-validator';
import { userController } from '../controllers';

const router = Router();

router.post(
  '',
  [check('name').notEmpty(), check('phone').notEmpty(), check('email').isEmail()],
  userController.createUser,
);
router.put('/:userId', userController.updateUser);
router.get('/:userId', userController.getUser);
router.delete('/:userId', userController.deleteUser);

export default router;

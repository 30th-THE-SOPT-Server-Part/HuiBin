import { Router } from 'express';
import { check } from 'express-validator';
import { blogController } from '../controllers';

const router = Router();

router.post(
  '',
  [check('title').notEmpty(), check('content').notEmpty(), check('author').notEmpty()],
  blogController.postBlog,
);
router.put('/:blogId', blogController.updateBlog);
router.get('/:blogId', blogController.getBlog);
router.delete('/:blogId', blogController.deleteBlog);

export default router;

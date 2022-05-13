import { Router } from 'express';
import { blogController } from '../controllers';

const router = Router();

router.post('', blogController.postBlog);
router.put('/:blogId', blogController.updateBlog);
router.get('/:blogId', blogController.getBlog);
router.delete('/:blogId', blogController.deleteBlog);

export default router;

import { Router } from 'express';

import { salespostController } from '../controller';
import { auth, upload } from '../middlewares';

const router: Router = Router();

router.post(
  '/:salespostId/suggest',
  auth,
  upload.single('image'),
  salespostController.createSuggest,
);

export default router;

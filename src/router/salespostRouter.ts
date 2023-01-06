import { Router } from 'express';

import { salespostController } from '../controller';
import auth from '../middlewares/auth';
import upload from '../middlewares/upload';

const router: Router = Router();

router.post(
  '/',
  auth,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'certifications', maxCount: 20 },
  ]),
  salespostController.salespostCreate,
);

export default router;

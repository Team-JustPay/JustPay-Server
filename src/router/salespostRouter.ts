import { Router } from 'express';

import { salespostController } from '../controller';
import { auth, upload } from '../middlewares';

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

router.post(
  '/:salespostId/suggest',
  auth,
  upload.single('image'),
  salespostController.createSuggest,
);
router.get('/certificationWord', salespostController.createCertificationWord);

export default router;

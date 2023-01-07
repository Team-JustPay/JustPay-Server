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

router.get('/:salespostId/certifications', salespostController.getCertifications);

router.patch('/:salespostId/status', salespostController.statusChange);

export default router;

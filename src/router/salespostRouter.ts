import { Router } from 'express';

import { salespostController } from '../controller';
import auth from '../middlewares/auth';
import upload from '../middlewares/upload';

const router: Router = Router();

router.post('/', auth, upload.single('mainImage'), salespostController.salespostCreate);

export default router;

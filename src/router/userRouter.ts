import { Router } from 'express';

import { userController } from '../controller';
import auth from '../middlewares/auth';

const router: Router = Router();

router.get('/my/salesposts', auth, userController.getMysalespost);

export default router;

import { Router } from 'express';

import { userController } from '../controller';
import auth from '../middlewares/auth';

const router: Router = Router();

router.get('/my/salesposts', auth, userController.getMysalespost);
router.get('/my/info', auth, userController.geyMyInfo);
router.put('/my/info', auth, userController.chageMyInfo);
router.get('/:userId', userController.getUserInfo);

export default router;

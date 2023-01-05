import { Router } from 'express';

import { userController } from '../controller';

const router: Router = Router();

router.post('/login', userController.signInUser);

export default router;

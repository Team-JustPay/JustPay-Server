import { Router } from 'express';

import authRouter from './authRouter';
import suggestRouter from './suggestRouter';
import userRouter from './userRouter';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/suggests', suggestRouter);

export default router;

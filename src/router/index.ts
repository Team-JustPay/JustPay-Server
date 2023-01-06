import { Router } from 'express';

import authRouter from './authRouter';
import salespostRouter from './salespostRouter';
import suggestRouter from './suggestRouter';
import userRouter from './userRouter';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/salesposts', salespostRouter);
router.use('/suggests', suggestRouter);

export default router;

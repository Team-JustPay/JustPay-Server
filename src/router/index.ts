import { Router } from "express";
import boardRouter from "./boardRouter";
import pinRouter from "./pinRouter";
import userRouter from "./userRouter";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/pins", pinRouter);
router.use("/boards", boardRouter);

export default router;
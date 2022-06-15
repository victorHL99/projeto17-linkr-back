import { Router } from "express";
import authRouter from "./authRouter.js";
import publishRouter from "./publishRouter.js";
import trendingRouter from "./trendingRouter.js";

const router = Router();

router.use(publishRouter);
router.use(authRouter);
router.use(trendingRouter);

export default router;

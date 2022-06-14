import { Router } from "express";
import authRouter from "./authRouter.js";
import publishRouter from "./publishRouter.js";

const router = Router();

router.use(publishRouter);
router.use(authRouter);

export default router;

import {Router} from 'express';
import publishRouter from "./publishRouter.js";
import trendingRouter from "./trendingRouter.js";

const router = Router();

router.use(publishRouter);
router.use(trendingRouter);

export default router;
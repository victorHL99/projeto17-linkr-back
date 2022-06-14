import {Router} from 'express';
import publishRouter from "./publishRouter.js";

const router = Router();

router.use(publishRouter);

export default router;
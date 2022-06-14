import {Router} from 'express';

import { getTrendinds } from '../controllers/trendingController.js';

const trendingRouter = Router();

trendingRouter.get('/trending', getTrendinds);

export default trendingRouter;
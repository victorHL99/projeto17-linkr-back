import { Router } from "express"
import authRouter from "./authRouter.js"
import likesRouter from "./likesRouter.js";
import postsRouter from "./postsRouter.js"
import publishRouter from "./publishRouter.js"
import trendingRouter from "./trendingRouter.js"
import userRouter from "./userRouter.js"
import searchBarRouter from "./searchBarRouter.js"

const router = Router()

router.use(publishRouter)
router.use(authRouter)
router.use(trendingRouter)
router.use(postsRouter)
router.use(userRouter)
router.use(likesRouter)
router.use(searchBarRouter)

export default router

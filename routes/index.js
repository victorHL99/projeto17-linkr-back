import { Router } from "express"
import authRouter from "./authRouter.js"
import postsRouter from "./postsRouter.js"
import publishRouter from "./publishRouter.js"
import trendingRouter from "./trendingRouter.js"
import userRouter from "./userRouter.js"

const router = Router()

router.use(publishRouter)
router.use(authRouter)
router.use(trendingRouter)
router.use(postsRouter)
router.use(userRouter)

export default router

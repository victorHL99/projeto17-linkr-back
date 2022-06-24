import { Router } from "express"
import authRouter from "./authRouter.js"
import likesRouter from "./likesRouter.js"
import postsRouter from "./postsRouter.js"
import shareRouter from "./shareRouter.js"
import trendingRouter from "./trendingRouter.js"
import userRouter from "./userRouter.js"
import commentsRouter from "./commentsRouter.js"

const router = Router()

router.use(authRouter)
router.use(trendingRouter)
router.use(postsRouter)
router.use(userRouter)
router.use(likesRouter)
router.use(commentsRouter)
router.use(shareRouter)

export default router

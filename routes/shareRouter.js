import { Router } from "express"

import { getSharedPosts, sharePost } from "../controllers/shareController.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"

const shareRouter = Router()
shareRouter.post("/share/:id", tokenValidation, sharePost)
shareRouter.get("/share", getSharedPosts)

export default shareRouter

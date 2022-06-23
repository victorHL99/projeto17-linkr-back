import { Router } from "express"

import { sharePost } from "../controllers/shareController.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"

const shareRouter = Router()
shareRouter.post("/share/:id", tokenValidation, sharePost)

export default shareRouter

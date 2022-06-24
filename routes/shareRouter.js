import { Router } from "express"

import { deleteRepost, sharePost } from "../controllers/shareController.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"

const shareRouter = Router()
shareRouter.post("/share/:id", tokenValidation, sharePost)
shareRouter.delete("/share/:id", tokenValidation, deleteRepost)

export default shareRouter

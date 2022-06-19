import { Router } from "express"
import { likesValidation } from "../middlewares/likesMiddleware.js"
import { addLike, getLikedByWho } from "../controllers/likesController.js"
import { deleteLike } from "../controllers/likesController.js"

const likesRouter = Router()

likesRouter.post("/likes", likesValidation, addLike)
likesRouter.delete("/likes", likesValidation, deleteLike)
likesRouter.get("/likes", getLikedByWho)

export default likesRouter

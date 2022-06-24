import { Router } from "express"

import {
  addLike,
  deleteLike,
  getLikedByWho,
  isLikedByUser,
} from "../controllers/likesController.js"

import { tokenValidation } from "./../middlewares/tokenValidation.js"

const likesRouter = Router()

likesRouter.get("/likes", tokenValidation, getLikedByWho)
likesRouter.get("/likes/:postId", tokenValidation, isLikedByUser)
likesRouter.post("/likes/:postId", tokenValidation, addLike)
likesRouter.delete("/likes/:postId", tokenValidation, deleteLike)

export default likesRouter

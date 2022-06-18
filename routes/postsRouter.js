import { Router } from "express"

import {
  deletePost,
  getPosts,
  getPostsByHashtag,
} from "../controllers/postsController.js"
import { userPostMiddleware } from "../middlewares/postsMiddleware.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"

const postsRouter = Router()

postsRouter.get("/posts", getPosts)
postsRouter.get("/hashtag/:hashtag", getPostsByHashtag)
postsRouter.get("/posts/:userId", getPosts)
postsRouter.delete(
  "/posts/:id",
  tokenValidation,
  userPostMiddleware,
  deletePost,
)

export default postsRouter

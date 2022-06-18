import { Router } from "express"

import {
  deletePost,
  getPosts,
  getPostsByHashtag,
} from "../controllers/postsController.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"

const postsRouter = Router()

postsRouter.get("/posts", getPosts)
postsRouter.get("/hashtag/:hashtag", getPostsByHashtag)
postsRouter.get("/posts/:userId", getPosts)
postsRouter.delete("/posts/:id", tokenValidation, deletePost)

export default postsRouter

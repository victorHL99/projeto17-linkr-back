import { Router } from "express"

import { getPosts, getPostsByHashtag } from "../controllers/postsController.js"

const postsRouter = Router()

postsRouter.get("/posts", getPosts)
postsRouter.get("/hashtag/:hashtag", getPostsByHashtag)
postsRouter.get("/posts/:userId", getPosts)

export default postsRouter
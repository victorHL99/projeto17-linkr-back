import { Router } from "express"

import { listComments, commentsCounter, getFollows } from "../controllers/commentsController.js"

const commentsRouter = Router()

commentsRouter.get("/comments/:postId", listComments)
commentsRouter.get("/comments/counter/:postId", commentsCounter)
commentsRouter.get("/comments/follows/:userId", getFollows)

export default commentsRouter
import { Router } from "express"

import { listComments, commentsCounter } from "../controllers/commentsController.js"

const commentsRouter = Router()

commentsRouter.get("/comments/:postId", listComments)
commentsRouter.get("/comments/counter/:postId", commentsCounter)

export default commentsRouter
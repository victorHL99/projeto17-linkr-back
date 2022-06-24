import { Router } from "express"

import { listComments, commentsCounter, insertComment, getFollows } from "../controllers/commentsController.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"
import updatePostSchema from "../schemas/updatePostSchema.js"
import { validateSchema } from "../middlewares/schemaValidator.js"

const commentsRouter = Router()

commentsRouter.get("/comments/:postId", listComments)
commentsRouter.get("/comments/counter/:postId", commentsCounter)
commentsRouter.post("/comments/:postId",tokenValidation, insertComment)
commentsRouter.get("/comments/follows/:userId", getFollows)

export default commentsRouter
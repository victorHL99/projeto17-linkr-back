import { Router } from "express"

import {
  getUser,
  getUserByUsername,
  followUser,
} from "../controllers/userController.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"
import { validateSchema } from "../middlewares/schemaValidator.js"
import followSchema from "../schemas/followSchema.js"

const userRouter = Router()

userRouter.get("/user", getUserByUsername)
userRouter.get("/user/:userId", getUser)
userRouter.post(
  "/user/:followedId",
  tokenValidation,
  validateSchema(followSchema),
  followUser,
)

export default userRouter

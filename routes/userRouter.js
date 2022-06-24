import { Router } from "express"

import {
  getUser,
  getUserByUsername,
  followUser,
  getFollowCount,
  unfollowUser,
} from "../controllers/userController.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"
import { validateSchema } from "../middlewares/schemaValidator.js"
import followSchema from "../schemas/followSchema.js"

const userRouter = Router()

userRouter.get("/user", getUserByUsername)
userRouter.get("/user/:userId", getUser)
userRouter.get("/follows", tokenValidation, getFollowCount)
userRouter.post("/user/:followedId", tokenValidation, followUser)
userRouter.delete("/user/:followedId", tokenValidation, unfollowUser)

export default userRouter

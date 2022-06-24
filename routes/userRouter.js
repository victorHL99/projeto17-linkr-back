import { Router } from "express"

import {
  getUser,
  getUserByUsername,
  followUser,
  getFollowCount,
  unfollowUser,
  getFollowState,
} from "../controllers/userController.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"
import { validateSchema } from "../middlewares/schemaValidator.js"

const userRouter = Router()

userRouter.get("/user", getUserByUsername)
userRouter.get("/user/:userId", getUser)
userRouter.get("/follows", tokenValidation, getFollowCount)
userRouter.get("/follows/:followedId", tokenValidation, getFollowState)
userRouter.post("/follows/:followedId", tokenValidation, followUser)
userRouter.delete("/follows/:followedId", tokenValidation, unfollowUser)

export default userRouter

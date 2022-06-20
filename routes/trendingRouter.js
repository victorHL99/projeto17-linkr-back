import { Router } from "express"

import { getTrendings } from "../controllers/trendingController.js"

const trendingRouter = Router()

trendingRouter.get("/trending", getTrendings)

export default trendingRouter

import { Router } from "express";
import { likesValidation } from "../middlewares/likesMiddleware.js";
import { addLike } from "../controllers/likesController.js";
import { deleteLike } from "../controllers/likesController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const likesRouter = Router();

likesRouter.post("/likes", tokenValidation,likesValidation, addLike);
likesRouter.delete("/likes/:post_id", tokenValidation, deleteLike);

export default likesRouter;
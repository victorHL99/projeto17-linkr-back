import { Router } from "express";

import { tokenValidation } from "../middlewares/tokenValidation.js";

import { getUserBySearch } from "../controllers/searchController.js";

const searchBarRouter = Router();

searchBarRouter.get("/searchBar/:name", tokenValidation, getUserBySearch);

export default searchBarRouter;
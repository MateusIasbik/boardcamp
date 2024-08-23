import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { gamesSchema } from "../schemas/games.schema.js"
import gamesController from "../controllers/games.controller.js";

const gamesRouter = Router()

gamesRouter.get("/games", gamesController.getGames)
gamesRouter.post("/games", validateSchema(gamesSchema), gamesController.createGame)

export default gamesRouter;
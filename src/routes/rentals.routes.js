import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { rentalsSchema } from "../schemas/rentals.schema.js"
import rentalsController from "../controllers/rentals.controller.js";

const rentalsRouter = Router()

rentalsRouter.get("/rentals", rentalsController.getRentals)
rentalsRouter.post("/rentals/:id/return", rentalsController.finshRentalById)
rentalsRouter.post("/rentals", validateSchema(rentalsSchema), rentalsController.createRental)
rentalsRouter.delete("/rentals/:id", rentalsController.deleteRentals)

export default rentalsRouter;
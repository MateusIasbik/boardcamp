import { Router } from "express";
import { getRentals, createRental, finshRentalById, deleteRentals } from "../controllers/rentals.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { rentalsSchema } from "../schemas/rentals.schema.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals/:id/return", finshRentalById)
rentalsRouter.post("/rentals", validateSchema(rentalsSchema), createRental)
rentalsRouter.delete("/rentals/:id", deleteRentals)

export default rentalsRouter;
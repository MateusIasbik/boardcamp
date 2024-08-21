import { Router } from "express";
import { getRentals, createRental, finshRentalById, deleteRentals } from "../controllers/rentals.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { rentalsSchema } from "../schemas/rentals.schema.js"

const rentalsRouter = Router()

customerRouter.get("/rentals", getRentals)
customerRouter.get("/rentals/:id", finshRentalById)
customerRouter.post("rentals", validateSchema(rentalsSchema), createRental)
customerRouter.delete("/rentals/:id", deleteRentals)

export default rentalsRouter;
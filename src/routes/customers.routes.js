import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import {  customersSchema } from "../schemas/customers.schema.js"
import customersController from "../controllers/customers.controller.js";

const customerRouter = Router()

customerRouter.get("/customers", customersController.getCustomer)
customerRouter.get("/customers/:id", customersController.getCustomerById)
customerRouter.post("/customers", validateSchema(customersSchema), customersController.createCustomer)

export default customerRouter;
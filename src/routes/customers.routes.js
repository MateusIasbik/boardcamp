import { Router } from "express";
import { createCustomer, getCustomer, getCustomerById } from "../controllers/customers.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { customerSchema } from "../schemas/customers.schema.js"

const customerRouter = Router()

customerRouter.get("/customers", getCustomer)
customerRouter.get("/customers/:id", getCustomerById)
customerRouter.post("/customers", validateSchema(customerSchema), createCustomer)

export default customerRouter;
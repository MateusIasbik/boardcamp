import { Router } from "express";
import gamesRouter from "./gamesRouter.js";
import customerRouter from "./customerRouter.js";
import rentalsRouter from "./rentalsRouter.js";

const router = Router();

router.use(gamesRouter);
router.use(customerRouter);
router.use(rentalsRouter);

export default router;

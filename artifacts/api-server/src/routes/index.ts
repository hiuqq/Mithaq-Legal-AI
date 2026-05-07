import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contractRouter from "./contract";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contractRouter);

export default router;

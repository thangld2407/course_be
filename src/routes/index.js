import { Router } from "express";
import authRouter from "./auth";
import classRouter from "./class";
const router = Router();

router.use("/auth", authRouter);
router.use("/class", classRouter);
export default router;

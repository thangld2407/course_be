import CreatePoint from "@/controller/Point/CreatePoint";
import ListPoint from "@/controller/Point/ListPoint";
import requireAuth from "@/middleware/requireAuth";
import { Router } from "express";

const pointRouter = Router();

pointRouter.post("/create", requireAuth, CreatePoint);
pointRouter.post("/list-point", requireAuth, ListPoint);

export default pointRouter;
import CreateController from "@/controller/Class/CreateController";
import JoinClass from "@/controller/Class/JoinClass";
import ListClass from "@/controller/Class/ListClass";
import requireAuth from "@/middleware/requireAuth";
import { Router } from "express";

const classRouter = Router();

classRouter.post("/create", requireAuth, CreateController);
classRouter.post("/join", requireAuth, JoinClass);
classRouter.get("/list", requireAuth, ListClass);

export default classRouter;

import CreateController from "@/controller/Class/CreateController";
import DeleteClassController from "@/controller/Class/DeleteClassController";
import DetailClass from "@/controller/Class/DetailClass";
import JoinClass from "@/controller/Class/JoinClass";
import ListClass from "@/controller/Class/ListClass";
import ListMemberClass from "@/controller/Class/ListMemberClass";
import UpdateClassController from "@/controller/Class/UpdateClassController";
import requireAuth from "@/middleware/requireAuth";
import { Router } from "express";

const classRouter = Router();

classRouter.post("/create", requireAuth, CreateController);
classRouter.post("/join", requireAuth, JoinClass);
classRouter.get("/list", requireAuth, ListClass);
classRouter.post("/list-member", requireAuth, ListMemberClass);
classRouter.post("/delete-class", requireAuth, DeleteClassController);
classRouter.post("/update-class", requireAuth, UpdateClassController);
classRouter.post("/detail-class", requireAuth, DetailClass);

export default classRouter;

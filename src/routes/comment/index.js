import CreateComment from "@/controller/Comment/CreateComment";
import ListComment from "@/controller/Comment/ListComment";
import requireAuth from "@/middleware/requireAuth";
import { Router } from "express";

const commentRouter = Router();

commentRouter.post("/create", requireAuth, CreateComment);
commentRouter.post("/list", requireAuth, ListComment);

export default commentRouter;

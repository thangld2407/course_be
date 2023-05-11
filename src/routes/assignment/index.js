import { Router } from "express";
import CreateAssignment from "@/controller/Assignment/CreateAssignment";
import DetailAssignment from "@/controller/Assignment/DetailAssignment";
import ListAssignment from "@/controller/Assignment/ListAssignment";
import SubmitAsm from "@/controller/Assignment/SubmitAsm";
import requireAuth from "@/middleware/requireAuth";

const asmRouter = Router();

asmRouter.post("/create", requireAuth, CreateAssignment);
asmRouter.post("/list-assignment", requireAuth, ListAssignment);
asmRouter.post("/detail", requireAuth, DetailAssignment);
asmRouter.post("/submit", requireAuth, SubmitAsm);

export default asmRouter;

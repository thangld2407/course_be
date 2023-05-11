import { Router } from "express";
import CreateUser from "@/controller/User/CreateUser";
import requireAuth from "@/middleware/requireAuth";
import ListUser from "@/controller/User/ListUser";
import EditUser from "@/controller/User/EditUser";
import DeleteUser from "@/controller/User/DeleteUser";

const userRouter = Router();

userRouter.post("/create", requireAuth, CreateUser);
userRouter.get("/list", requireAuth, ListUser);
userRouter.post("/edit", requireAuth, EditUser);
userRouter.post("/delete", requireAuth, DeleteUser);

export default userRouter;

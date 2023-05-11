import CreateBlog from "@/controller/Blog/CreateBlog";
import DeleteBlog from "@/controller/Blog/DeleteBlog";
import ListBlog from "@/controller/Blog/ListBlog";
import MyListBlog from "@/controller/Blog/MyListBlog";
import UpdateBlog from "@/controller/Blog/UpdateBlog";
import requireAuth from "@/middleware/requireAuth";
import { Router } from "express";
const blogRouter = Router();

blogRouter.post("/create", requireAuth, CreateBlog);
blogRouter.get("/list", requireAuth, ListBlog);
blogRouter.get("/my-list", requireAuth, MyListBlog);
blogRouter.post("/edit", requireAuth, UpdateBlog);
blogRouter.post("/delete", requireAuth, DeleteBlog);

export default blogRouter;

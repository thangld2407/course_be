import { Router } from "express";
import authRouter from "./auth";
import classRouter from "./class";
import userRouter from "./user";
import { upload } from "@/middleware/upload";
import Upload from "@/controller/Upload";
import blogRouter from "./blog";
import uploadArray from "@/controller/Upload/uploadArray";
import asmRouter from "./assignment";
import pointRouter from "./point";
import commentRouter from "./comment";
const path = require("path");
const router = Router();

router.use("/auth", authRouter);
router.use("/class", classRouter);
router.use("/user", userRouter);
router.use("/blog", blogRouter);
router.use("/assignment", asmRouter);
router.use("/point", pointRouter);
router.use('/comment', commentRouter)
router.post("/upload", upload.single("attachment"), Upload);
router.post("/upload-array", upload.array("attachment"), uploadArray);
router.get("/download/uploads/:filename", (req, res) => {
  const file = path.join(__dirname, "../assets/uploads", req.params.filename);
  res.download(file);
});
export default router;

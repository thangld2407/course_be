import Auth from "@/controller/Auth";
import requireAuth from "@/middleware/requireAuth";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", Auth.LOGIN);
authRouter.post("/register", Auth.REGISTER);
authRouter.post("/relogin", requireAuth, Auth.RELOGIN);
authRouter.post("/resetpassword", Auth.RESETPASSWORD);
authRouter.post("/changepassword", requireAuth, Auth.CHANGEPASSWORD);
authRouter.post("/send-otp", Auth.SEND_OTP);

export default authRouter;

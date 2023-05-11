import Auth from "@/controller/Auth";
import ChangeProfile from "@/controller/Auth/ChangeProfile";
import Profile from "@/controller/Auth/Profile";
import requireAuth from "@/middleware/requireAuth";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", Auth.LOGIN);
authRouter.post("/register", Auth.REGISTER);
authRouter.post("/relogin", requireAuth, Auth.RELOGIN);
authRouter.post("/resetpassword", Auth.RESETPASSWORD);
authRouter.post("/changepassword", requireAuth, Auth.CHANGEPASSWORD);
authRouter.post("/send-otp", Auth.SEND_OTP);
authRouter.get("/profile", requireAuth, Profile);
authRouter.post("/change-profile", requireAuth, ChangeProfile);

export default authRouter;

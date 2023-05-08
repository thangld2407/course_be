import ChangePassword from "./ChangePasswordController";
import ForgetPassword from "./ForgetPasswordController";
import LoginController from "./LoginController";
import OtpController from "./OtpController";
import RegisterController from "./RegisterController";
import ReloginController from "./ReloginController";

export default {
  LOGIN: LoginController,
  REGISTER: RegisterController,
  RELOGIN: ReloginController,
  RESETPASSWORD: ForgetPassword,
  CHANGEPASSWORD: ChangePassword,
  SEND_OTP: OtpController,
};

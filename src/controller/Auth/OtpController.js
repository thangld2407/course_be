import { errorHandle } from "@/error/errorHandler";
import sendEmail from "@/helper/mailer";
import { generateOTP } from "@/helper/otp";
import { SET_OTP_EMAIL } from "@/helper/redisHelper";
import { templateEmailOTP } from "@/helper/templateEmail";
import { validEmail } from "@/helper/validate";
import UserModel from "@/model/UserModel";

export default async function (req, res) {
  const { email } = req.body;
  if (!email) {
    const error = errorHandle(2000);
    return res.status(200).json({
      ...error,
      error_message: "Email is not valid",
    });
  }

  if (!validEmail(email)) {
    const error = errorHandle(2001);
    return res.status(200).json({
      ...error,
      error_message: "Email is not valid",
    });
  }

  try {
    const is_exist = await UserModel.findOne({ email }).lean();
    if (!is_exist) {
      const error = errorHandle(2002);
      return res.status(200).json({
        ...error,
        error_message: "Email is not found",
      });
    }

    const OTP = generateOTP();
    // TODO: send OTP to email

    // Send email to user
    const name = `${is_exist.first_name} ${is_exist.last_name}` || "User";
    const html = templateEmailOTP(name, OTP);
    await sendEmail(email, "Reset password", html);

    return res.status(200).json({
      error_code: 0,
      message: "Success",
      data: {
        OTP,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

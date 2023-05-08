import { errorHandle } from "@/error/errorHandler";
import sendEmail from "@/helper/mailer";
import { generatePassword, hashPw } from "@/helper/passwordHelper";
import { DELETE_OTP_EMAIL, GET_OTP_EMAIL } from "@/helper/redisHelper";
import { templateEmailResetPassword } from "@/helper/templateEmail";
import { validEmail } from "@/helper/validate";
import UserModel from "@/model/UserModel";

export default async function (req, res) {
  try {
    const { email, otp } = req.body;

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

    const is_exist = await UserModel.findOne({ email }).lean();

    if (!is_exist) {
      const error = errorHandle(2002);
      return res.status(200).json({
        ...error,
        error_message: "Email is not found",
      });
    }

    // kiểm tra OTP có hợp lệ hay không
    if (!otp) {
      const error = errorHandle(3000);
      return res.status(200).json({
        ...error,
        error_message: "OTP is not valid",
      });
    }

    const is_valid_otp = await GET_OTP_EMAIL(email);
    if (is_valid_otp !== otp) {
      const error = errorHandle(3000);
      return res.status(200).json({
        ...error,
        error_message: "OTP is not valid",
      });
    }


    // Tạo random new password
    const newPassword = generatePassword(10);

    // Send email to user
    const html = templateEmailResetPassword(is_exist.last_name, newPassword);
    await sendEmail(email, "Reset password", html);

    // Hash new password
    const new_password_hash = hashPw(newPassword);
    await UserModel.updateOne(
      {
        email,
      },
      {
        password: new_password_hash,
      }
    );

    return res.status(200).json({
      message: "Password has been changed",
      status_code: 200,
    });
    
  } catch (error) {
    return res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

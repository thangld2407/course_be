import generateString from "@/helper/generateCode";
import sendEmail from "@/helper/mailer";
import { hashPw } from "@/helper/passwordHelper";
import UserModel from "@/model/UserModel";

export default async function (req, res) {
  try {
    const { email, name, address, avatar, role } = req.body;
    if (!email || !name || !role) {
      return res.status(200).json({
        error_code: 2000,
        message: "Email, name, role is not valid",
      });
    }

    const hasUser = await UserModel.findOne({ email }).lean();
    if (hasUser) {
      return res.status(200).json({
        error_code: 2001,
        message: "Email is already exists",
      });
    }
    const tmp_pw = generateString(8).trim();
    const password = hashPw(tmp_pw);
    const data = {
      email,
      name,
      address,
      avatar,
      role,
      password,
    };
    const user = await UserModel.create(data);
    const { password: pw, ...rest } = user.toObject();
    await sendEmail(
      email,
      "Bạn đã được thêm vào hệ thống",
      `
    email: ${email}
    password: ${tmp_pw}
    `
    );
    res.status(200).json({
      error_code: 0,
      message: "Success",
      status_code: 200,
      data: rest,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

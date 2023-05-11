import generateString from "@/helper/generateCode";
import sendEmail from "@/helper/mailer";
import { hashPw } from "@/helper/passwordHelper";
import UserModel from "@/model/UserModel";

export default async function (req, res) {
  try {
    const { name, address, role, user_id } = req.body;
    if (!name || !role) {
      return res.status(200).json({
        error_code: 2000,
        message: "Email, name, role is not valid",
      });
    }

    if (!user_id) {
      return res.status(200).json({
        error_code: 2000,
        message: "User id is not valid",
      });
    }

    const hasUserId = await UserModel.findOne({ _id: user_id }).lean();
    if (!hasUserId) {
      return res.status(200).json({
        error_code: 2001,
        message: "User is not found",
      });
    }

    const data = {
      name,
      address,
      role,
    };
    const user = await UserModel.findOneAndUpdate(
      {
        _id: user_id,
      },
      data
    );

    const { password: pw, ...rest } = user.toObject();

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

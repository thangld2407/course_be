import { errorHandle } from "@/error/errorHandler";
import { comparePw, hashPw } from "@/helper/passwordHelper";
import UserModel from "@/model/UserModel";

export default async function (req, res) {
  try {
    const { user } = req.state;
    const { old_password, new_password } = req.body;

    if (!old_password || !new_password) {
      const error = errorHandle(100);
      return res.status(200).json({
        ...error,
        error_message: "Old password or new password is not valid",
      });
    }

    const is_exist = await UserModel.findOne({
      _id: user._id,
    }).lean();

    if (!is_exist) {
      const error = errorHandle(102);
      return res.status(200).json({
        ...error,
        error_message: "User is not found",
      });
    }

    const is_match = comparePw(old_password, is_exist.password);

    if (!is_match) {
      const error = errorHandle(100);
      return res.status(200).json({
        ...error,
        error_message: "password is not valid",
      });
    }

    const new_password_hash = hashPw(new_password);

    await UserModel.updateOne(
      {
        _id: user._id,
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

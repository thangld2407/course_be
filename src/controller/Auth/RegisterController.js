import { errorHandle } from "@/error/errorHandler";
import { hashPw } from "@/helper/passwordHelper";
import { validEmail } from "@/helper/validate";
import UserModel from "@/model/UserModel";

const TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_LIFE_TIME * 1000 || 0;

export default async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = errorHandle(101);
      return res.status(200).json({
        ...error,
      });
    }

    // kiểm tra email có đúng định dạng hay không
    if (!validEmail(email)) {
      const error = errorHandle(2001);
      return res.status(200).json({
        ...error,
      });
    }

    const is_exist = await UserModel.findOne({ email }).lean();

    // kiểm tra email đã tồn tại hay chưa
    if (is_exist) {
      const error = errorHandle(2003);
      return res.status(200).json({
        ...error,
      });
    }

    // mã hóa password
    const hashPassword = hashPw(password);

    // tạo mới user
    const newUser = new UserModel({
      email,
      password: hashPassword,
    });

    const user = await newUser.save();

    const { password: _, __v, ...rest } = user._doc;

    res.status(200).json({
      message: "Register success",
      user: rest,
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

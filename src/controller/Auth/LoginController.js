import { errorHandle } from "@/error/errorHandler";
import { validEmail } from "@/helper/validate";
import { comparePw } from "@/helper/passwordHelper";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import UserModel from "@/model/UserModel";
import {
  setAccessTokenCache,
  setRefreshTokenCache,
} from "@/helper/redisHelper";

const TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_LIFE_TIME * 1000 || 0;

export default async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = errorHandle(101);
      return res.status(200).json({
        ...error,
        error_message: "Email or password is not valid",
      });
    }

    if (!validEmail(email)) {
      const error = errorHandle(2001);
      return res.status(200).json({
        ...error,
        error_message: "Email is not valid",
      });
    }

    const is_exist = await UserModel.findOne({
      email,
    }).lean();

    if (!is_exist) {
      const error = errorHandle(102);
      return res.status(200).json({
        ...error,
        error_message: "email or password is not valid",
      });
    }

    const is_match = comparePw(password, is_exist.password);

    if (!is_match) {
      const error = errorHandle(1002);
      return res.status(200).json({
        ...error,
        error_message: "email or password is not valid",
      });
    }

    const access_token = generateAccessToken(is_exist);
    const refresh_token = generateRefreshToken(is_exist);

    const { password: _, __v, ...user } = is_exist;
    const access_token_expired = new Date().getTime() + TOKEN_EXPIRED;
    return res.status(200).json({
      access_token,
      refresh_token,
      user,
      access_token_expired,
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

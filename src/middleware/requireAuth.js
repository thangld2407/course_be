import { errorHandle } from "@/error/errorHandler";
import { verifyRedis } from "@/helper/redisHelper";
import { verifyAccessToken } from "@/utils/jwt";

export default async function (req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    const error = errorHandle(401);
    return res.status(200).json({
      ...error,
      error_message: "Unauthorized",
    });
  }

  const token = header.split(" ")[1];

  try {
    // verify with jwt
    const payload = verifyAccessToken(token);
    // set payload state
    if (req.state === undefined || !req.state) req.state = {};
    req.state.user = payload;
    // next state
    return next();
  } catch (e) {
    return res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: e.message,
    });
  }
}

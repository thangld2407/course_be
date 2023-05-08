import CONFIG from "@/config";
import jwt from "jsonwebtoken";
const generateAccessToken = (payload) => {
  return jwt.sign(payload, CONFIG.JWT.ACCESS_TOKEN_SECRET, {
    expiresIn: CONFIG.JWT.ACCESS_TOKEN_LIFE,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, CONFIG.JWT.REFRESH_TOKEN_SECRET, {
    expiresIn: CONFIG.JWT.REFRESH_TOKEN_LIFE,
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, CONFIG.JWT.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, CONFIG.JWT.REFRESH_TOKEN_SECRET);
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

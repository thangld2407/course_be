import {
  ACCESS_TOKEN_CACHE_KEY,
  OTP_EMAIL,
  REFRESH_TOKEN_CACHE_KEY,
} from "@/constant/redis";
import redisClient from "@/utils/redis";

export async function getAcessTokenCache(userId) {
  const accessToken = await redisClient.GET(ACCESS_TOKEN_CACHE_KEY(userId));
  return accessToken;
}

export async function setAccessTokenCache(userId, accessToken) {
  const KEY = ACCESS_TOKEN_CACHE_KEY(userId);
  const EXPIRED_TIME = process.env.JWT_ACCESS_TOKEN_LIFE_TIME * 1000 || 0;
  await Promise.all([
    redisClient.SET(KEY, accessToken),
    redisClient.EXPIRE(KEY, EXPIRED_TIME),
  ]);
}

export async function deleteAccessTokenCache(userId) {
  await deleteKey(ACCESS_TOKEN_CACHE_KEY(userId));
}

export async function getRefreshTokenCache(userId) {
  const refreshToken = await redisClient.GET(REFRESH_TOKEN_CACHE_KEY(userId));
  return refreshToken;
}

export async function setRefreshTokenCache(userId, refreshToken) {
  const KEY = REFRESH_TOKEN_CACHE_KEY(userId);
  const EXPIRED_TIME = process.env.JWT_REFRESH_TOKEN_LIFE * 1000 || 0;
  await Promise.all([
    redisClient.SET(KEY, refreshToken),
    redisClient.EXPIRE(KEY, EXPIRED_TIME),
  ]);
}

export async function deleteRefreshTokenCache(userId) {
  await deleteKey(REFRESH_TOKEN_CACHE_KEY(userId));
}

export async function deleteKey(KEY) {
  await redisClient.DEL(KEY);
}

export async function verifyRedis(key) {
  return await redisClient.EXISTS(key);
}

// OTP:email
export async function SET_OTP_EMAIL(email, value) {
  const KEY = OTP_EMAIL(email);
  return await Promise.all([
    redisClient.SET(KEY, value),
    redisClient.EXPIRE(KEY, 60 * 5), 
  ]);
}

export async function GET_OTP_EMAIL(email) {
  const KEY = OTP_EMAIL(email);
  return await redisClient.GET(KEY);
}

export async function DELETE_OTP_EMAIL(email) {
  const KEY = OTP_EMAIL(email);
  return await redisClient.DEL(KEY);
}

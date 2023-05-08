import { createClient } from "redis";
import config from "../config";
const options = {
  host: config.REDIS.HOST,
  port: config.REDIS.PORT,
  password: config.REDIS.PASSWORD,
};
const redisClient = createClient({
  ...options,
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (err) => {
  console.log("Something went wrong " + err);
});

export default redisClient;

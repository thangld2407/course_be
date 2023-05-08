import { HASH_KEY } from "./hash";
import { JWT } from "./jwt";
import { MONGODB } from "./mongod";
import { REDIS } from "./redis";

export default {
  JWT,
  HASH_SECRET_KEY: HASH_KEY,
  REDIS,
  MONGODB,
};

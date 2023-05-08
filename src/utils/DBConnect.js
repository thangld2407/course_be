import mongoose from "mongoose";
import config from "../config";
const db = {
  connect: config.MONGODB.CONNECT,
  host: config.MONGODB.HOST,
  database: config.MONGODB.NAME,
  user: config.MONGODB.USER,
  password: config.MONGODB.PASSWORD,
};

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(`${db.connect}://${db.host}/${db.database}`);
    console.log("MongoDB connected");
  } catch (error) {
    throw new Error(error);
  }
};

export default connectDb;

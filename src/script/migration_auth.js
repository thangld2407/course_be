import "dotenv/config";
import connectDb from "@/utils/DBConnect";
import UserModel from "@/model/UserModel";
import { hashPw } from "@/helper/passwordHelper";

const migrate = async () => {
  await connectDb();
  await UserModel.deleteMany({});
  const DATA = [
    {
      email: "admin@gmail.com",
      password: hashPw("123456"),
      name: "Admin",
      role: "admin",
    },
    {
      email: "teacher@gmail.com",
      password: hashPw("123456"),

      name: "Teacher",
      role: "teacher",
    },
    {
      email: "student@gmail.com",
      password: hashPw("123456"),

      name: "Student",
      role: "student",
    },
  ];

  for (let i = 0; i < DATA.length; i++) {
    const user = new UserModel(DATA[i]);
    await user.save();
  }
  console.log("Migrate success");
  process.exit();
};

migrate();

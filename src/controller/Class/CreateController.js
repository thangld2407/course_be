import ClassModel from "@/model/ClassModel";
import generateString from "@/helper/generateCode";
import RegisterClassModel from "@/model/RegisterClassModel";
import UserModel from "@/model/UserModel";
export default async function (req, res) {
  try {
    const { class_name, description, topic, teacher_email } = req.body;
    const user = req.state.user;

    if (!class_name) {
      return res.status(200).json({
        error_code: 2000,
        message: "Class name is not valid",
      });
    }

    if (!topic) {
      return res.status(200).json({
        error_code: 2001,
        message: "Topic is not valid",
      });
    }

    const hasClass = await ClassModel.findOne({ class_name }).lean();
    if (hasClass) {
      return res.status(200).json({
        error_code: 2002,
        message: "Class name is exist",
      });
    }

    const data = await ClassModel.create({
      description,
      title: class_name,
      topic,
      class_code: generateString(6).trim(),
    });

    if (user && user.role === "teacher") {
      console.log("Giáo viên");
      await RegisterClassModel.create({
        user: user._id,
        class: data._id,
      });
    }
    if (user && user.role === "admin" && teacher_email) {
      console.log("Admin");
      const hasTeacher = await UserModel.findOne({
        email: teacher_email,
      }).lean();

      if (!hasTeacher) {
        return res.status(200).json({
          error_code: 2003,
          message: "Teacher is not exist",
        });
      }
      await RegisterClassModel.create({
        user: hasTeacher._id,
        class: data._id,
      });
    }

    res.status(200).json({
      error_code: 0,
      message: "Success",
      status_code: 200,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

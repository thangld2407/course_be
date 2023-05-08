import ClassModel from "@/model/ClassModel";
import RegisterClassModel from "@/model/RegisterClassModel";

export default async function (req, res) {
  try {
    const { class_code } = req.body;
    const user = req.state.user;
    const findClass = await ClassModel.findOne({ class_code }).lean();
    if (!findClass) {
      return res.status(200).json({
        error_code: 2000,
        message: "Class is not found",
      });
    }

    const isRegister = await RegisterClassModel.findOne({
      user: user._id,
      class: findClass._id,
    }).lean();

    if (isRegister) {
      return res.status(200).json({
        error_code: 2001,
        message: "You was register this class",
      });
    }

    await RegisterClassModel.create({
      user: user._id,
      class: findClass._id,
    });

    return res.status(200).json({
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

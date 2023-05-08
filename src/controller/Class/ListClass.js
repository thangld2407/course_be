import ClassModel from "@/model/ClassModel";
import RegisterClassModel from "@/model/RegisterClassModel";

export default async function (req, res) {
  try {
    const user = req.state.user;
    if (user && user.role === "student") {
      const listClass = await RegisterClassModel.find({ user: user._id })
        .populate("class")
        .lean();
      return res.status(200).json({
        error_code: 0,
        message: "Success",
        status_code: 200,
        data: listClass,
      });
    } else {
      const listClass = await ClassModel.find({}).lean();
      return res.status(200).json({
        error_code: 0,
        message: "Success",
        status_code: 200,
        data: listClass,
      });
    }
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

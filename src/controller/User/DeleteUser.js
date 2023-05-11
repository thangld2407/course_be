import RegisterClassModel from "@/model/RegisterClassModel";
import UserModel from "@/model/UserModel";

export default async function (req, res) {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(200).json({
        error_code: 2000,
        message: "User id is not valid",
      });
    }

    const hasUser = await UserModel.findOne({ _id: user_id }).lean();
    if (!hasUser) {
      return res.status(200).json({
        error_code: 2001,
        message: "User is not found",
      });
    }

    const userHasClass = await RegisterClassModel.find({ user: user_id });

    if (userHasClass.length > 0) {
      await RegisterClassModel.deleteMany({ user: user_id });
    }

    await UserModel.deleteOne({ _id: user_id });

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

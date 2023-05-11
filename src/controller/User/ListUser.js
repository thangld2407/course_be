import UserModel from "@/model/UserModel";

export default async function (req, res) {
  try {
    const user = await UserModel.find({
      is_deleted: false,
    }).lean();

    res.status(200).json({
      error_code: 0,
      message: "Success",
      status_code: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

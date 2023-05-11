import UserModel from "@/model/UserModel";

export default async function (req, res) {
  try {
    const user = req.state.user;
    if (!user) {
      return res.status(200).json({
        error_code: 2000,
        message: "User is not found",
      });
    }

    const { name, address } = req.body;
    await UserModel.updateOne(
      {
        _id: user._id,
      },
      {
        name,
        address,
      }
    );

    res.status(200).json({
      status_code: 200,
      message: "Update profile successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

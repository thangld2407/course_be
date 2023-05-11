import BlogModel from "@/model/BlogModel";

export default async function (req, res) {
  try {
    const blogs = await BlogModel.find({
      user: req.state.user._id,
    })
      .populate("user")
      .lean();
    res.status(200).json({
      error_code: 0,
      message: "Success",
      status_code: 200,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

import BlogModel from "@/model/BlogModel";
import mongoose from "mongoose";

export default async function (req, res) {
  try {
    const { post_id } = req.body;

    if (!post_id) {
      return res.status(200).json({
        error_code: 2002,
        message: "Post id is not valid",
      });
    }

    const hasPost = await BlogModel.findOne({
      _id: mongoose.Types.ObjectId(post_id),
    }).lean();

    if (!hasPost) {
      return res.status(200).json({
        error_code: 2003,
        message: "Post is not found",
      });
    }

    await BlogModel.deleteOne({
      _id: mongoose.Types.ObjectId(post_id),
    });

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

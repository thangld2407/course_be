import BlogModel from "@/model/BlogModel";
import UserModel from "@/model/UserModel";
import mongoose from "mongoose";

export default async function (req, res) {
  try {
    const { content, post_id } = req.body;
    const user = req.state.user;

    if (!content) {
      return res.status(200).json({
        error_code: 2001,
        message: "Content is not valid",
      });
    }

    if (!post_id) {
      return res.status(200).json({
        error_code: 2002,
        message: "Post id is not valid",
      });
    }

    const hasUser = await UserModel.findOne({
      _id: mongoose.Types.ObjectId(user._id),
    }).lean();

    if (!hasUser) {
      return res.status(200).json({
        error_code: 2002,
        message: "User is not found",
      });
    }

    const blogOfUser = await BlogModel.findOne({
      _id: mongoose.Types.ObjectId(post_id),
      user: mongoose.Types.ObjectId(user._id),
    }).lean();

    if (!blogOfUser) {
      return res.status(200).json({
        error_code: 2003,
        message: "Post is not found",
      });
    }

    await BlogModel.updateOne(
      { _id: mongoose.Types.ObjectId(post_id) },
      { content }
    );

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

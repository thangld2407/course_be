import BlogModel from "@/model/BlogModel";
import UserModel from "@/model/UserModel";
import mongoose from "mongoose";

export default async function (req, res) {
  try {
    const { title, content, image } = req.body;
    const user = req.state.user;

    if (!title) {
      return res.status(200).json({
        error_code: 2000,
        message: "Title is not valid",
      });
    }

    if (!content) {
      return res.status(200).json({
        error_code: 2001,
        message: "Content is not valid",
      });
    }

    const hasUser = await UserModel.findOne({
      _id: mongoose.Types.ObjectId(user._id),
    }).lean();
    console.log(hasUser);
    if (!hasUser) {
      return res.status(200).json({
        error_code: 2002,
        message: "User is not found",
      });
    }

    const newBlog = new BlogModel({
      title,
      content,
      user: hasUser._id,
      image,
    });

    await newBlog.save();

    res.status(200).json({
      error_code: 0,
      message: "Success",
      status_code: 200,
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

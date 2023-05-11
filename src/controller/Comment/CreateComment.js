import AssignmentModel from "@/model/AssignmentModel";
import CommentModel from "@/model/CommentModel";

export default async function (req, res) {
  try {
    const user = req.state.user;
    const { content, asm_id } = req.body;
    if (!user) {
      return res.status(200).json({
        error_code: 2000,
        message: "User is not found",
      });
    }
    if (!content) {
      return res.status(200).json({
        error_code: 2001,
        message: "Content is required",
      });
    }

    if (!asm_id) {
      return res.status(200).json({
        error_code: 2002,
        message: "Asm id is required",
      });
    }

    const hasAsm = await AssignmentModel.findOne({ _id: asm_id }).lean();
    if (!hasAsm) {
      return res.status(200).json({
        error_code: 2003,
        message: "Asm is not found",
      });
    }

    const newComment = await CommentModel.create({
      content,
      assignment: asm_id,
      user: user._id,
    });

    return res.status(200).json({
      error_code: 0,
      message: "Success",
      status_code: 200,
      data: {
        ...newComment.toObject(),
        user: user,
      },
    });
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

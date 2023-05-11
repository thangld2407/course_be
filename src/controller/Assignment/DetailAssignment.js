import AssignmentModel from "@/model/AssignmentModel";
import ClassModel from "@/model/ClassModel";
import CommentModel from "@/model/CommentModel";

export default async function (req, res) {
  try {
    const { asm_id } = req.body;

    if (!asm_id) {
      return res.status(200).json({
        error_code: 2000,
        message: "asm id is not valid",
      });
    }

    const hasAsm = await AssignmentModel.findOne({ _id: asm_id })
      .populate("class")
      .lean();
    if (!hasAsm) {
      return res.status(200).json({
        error_code: 2001,
        message: "Assignment is not found",
      });
    }

    const listComment = await CommentModel.find({
      assignment: asm_id,
    })
      .sort({
        created_at: -1,
      })
      .populate("user");

    res.status(200).json({
      error_code: 0,
      message: "Success",
      status_code: 200,
      data: {
        assignment: hasAsm,
        comment: listComment,
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

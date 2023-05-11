import AssignmentModel from "@/model/AssignmentModel";
import StudentSubmit from "@/model/StudentSubmit";
import UserModel from "@/model/UserModel";

export default async function (req, res) {
  try {
    const { asm_id, attachment } = req.body;
    const user = req.state.user;
    if (!asm_id) {
      return res.status(200).json({
        error_code: 2000,
        message: "asm id is not valid",
      });
    }
    const findAsm = await AssignmentModel.findOne({ _id: asm_id }).lean();

    if (!findAsm) {
      return res.status(200).json({
        error_code: 2001,
        message: "Assignment is not found",
      });
    }

    const hasUser = await UserModel.findOne({ _id: user._id }).lean();
    if (!hasUser) {
      return res.status(200).json({
        error_code: 2002,
        message: "User is not found",
      });
    }

    const hasSubmission = await StudentSubmit.findOne({
      assignment: asm_id,
      user: hasUser._id,
    });

    if (hasSubmission) {
      await StudentSubmit.findOneAndUpdate(
        {
          assignment: asm_id,
          user: user._id,
        },
        {
          attachment,
        }
      );
      return res.status(200).json({
        message: "You have submitted this assignment",
        status_code: 200,
        error_code: 0,
      });
    }

    const newSubmission = new StudentSubmit({
      assignment: asm_id,
      user: user._id,
      attachment,
    });

    await newSubmission.save();
    res.status(200).json({
      message: "Success",
      status_code: 200,
      error_code: 0,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

import AssignmentModel from "@/model/AssignmentModel";
import PointModel from "@/model/PointModel";
import UserModel from "@/model/UserModel";

export default async function (req, res) {
  try {
    const { asm_id, user_id, point } = req.body;
    if (!asm_id) {
      return res.status(200).json({
        error_code: 2000,
        message: "Asm id is not valid",
      });
    }

    if (!user_id) {
      return res.status(200).json({
        error_code: 2001,
        message: "User id is not valid",
      });
    }

    const hasAsm = await AssignmentModel.findOne({ _id: asm_id });
    if (!hasAsm) {
      return res.status(200).json({
        error_code: 2002,
        message: "Assignment is not found",
      });
    }

    const hasUser = await UserModel.findOne({ _id: user_id });
    if (!hasUser) {
      return res.status(200).json({
        error_code: 2003,
        message: "User is not found",
      });
    }

    const hasUserInAsm = await AssignmentModel.findOne({
      _id: asm_id,
    }).lean();

    if (!hasUserInAsm) {
      return res.status(200).json({
        error_code: 2004,
        message: "User is not in assignment",
      });
    }

    const userHasPoint = await PointModel.findOne({
      assigment: hasAsm._id,
      user: hasUser._id,
    });

    if (userHasPoint) {
      await PointModel.updateOne(
        {
          assigment: hasAsm._id,
          user: hasUser._id,
        },
        {
          point: point,
        }
      );

      return res.status(200).json({
        error_code: 0,
        message: "Success",
        status_code: 200,
      });
    }

    await PointModel.create({
      assigment: hasAsm._id,
      user: hasUser._id,
      point: point,
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

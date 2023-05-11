import AssignmentModel from "@/model/AssignmentModel";
import ClassModel from "@/model/ClassModel";
import PointModel from "@/model/PointModel";
import RegisterClassModel from "@/model/RegisterClassModel";
import StudentSubmit from "@/model/StudentSubmit";

export default async function (req, res) {
  try {
    const { class_id, asm_id, student_id } = req.body;

    if (!class_id) {
      return res.status(200).json({
        error_code: 2000,
        message: "Class id is not valid",
      });
    }

    if (!asm_id) {
      return res.status(200).json({
        error_code: 2000,
        message: "Assignment id is not valid",
      });
    }

    const hasClass = await ClassModel.findOne({ _id: class_id }).lean();
    if (!hasClass) {
      return res.status(200).json({
        error_code: 2001,
        message: "Class is not found",
      });
    }

    const hasAssignment = await AssignmentModel.findOne({ _id: asm_id }).lean();
    if (!hasAssignment) {
      return res.status(200).json({
        error_code: 2001,
        message: "Assignment is not found",
      });
    }

    const asmInClass = await AssignmentModel.findOne({
      _id: asm_id,
      class: class_id,
    }).lean();

    if (!asmInClass) {
      return res.status(200).json({
        error_code: 2001,
        message: "Assignment is not found in class",
      });
    }

    const listUserInClass = await RegisterClassModel.find({
      class: class_id,
    })
      .populate("user")
      .lean();

    let userPoint = [];
    console.log(asm_id);
    for (let i = 0; i < listUserInClass.length; i++) {
      if (listUserInClass[i].user.role === "student") {
        let query = {
          user: listUserInClass[i].user._id,
          assigment: asm_id,
        };
        let pointOfUser = await PointModel.findOne({
          user: listUserInClass[i].user._id,
          assigment: asm_id,
        })
          .populate("user")
          .populate("assigment")
          .lean();
        const userSubmission = await StudentSubmit.findOne({
          user: listUserInClass[i].user._id,
          assignment: asm_id,
        });

        if (!pointOfUser) {
          pointOfUser = {
            user: listUserInClass[i].user,
            point: 0,
            assigment: hasAssignment,
            submission: userSubmission ? userSubmission : {},
          };
        } else {
          pointOfUser = {
            user: pointOfUser.user,
            point: pointOfUser.point,
            assigment: pointOfUser.assigment,
            submission: userSubmission ? userSubmission : {},
          };
        }

        userPoint.push(pointOfUser);
      }
    }

    res.status(200).json({
      error_code: 0,
      message: "Success",
      status_code: 200,
      data: userPoint,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

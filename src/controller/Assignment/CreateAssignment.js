import AssignmentModel from "@/model/AssignmentModel";
import ClassModel from "@/model/ClassModel";

export default async function (req, res) {
  try {
    const { class_id, title, description, due_date, documentation } = req.body;

    if (!class_id) {
      return res.status(200).json({
        error_code: 2000,
        message: "Class id is not valid",
      });
    }

    const hasClass = await ClassModel.findOne({ _id: class_id }).lean();
    if (!hasClass) {
      return res.status(200).json({
        error_code: 2001,
        message: "Class is not found",
      });
    }

    if (!title) {
      return res.status(200).json({
        error_code: 2002,
        message: "Title is not valid",
      });
    }

    if (!description) {
      return res.status(200).json({
        error_code: 2003,
        message: "Description is not valid",
      });
    }

    if (!due_date) {
      return res.status(200).json({
        error_code: 2004,
        message: "Due date is not valid",
      });
    }

    if (!documentation) {
      return res.status(200).json({
        error_code: 2005,
        message: "Documentation is not valid",
      });
    }

    const newAssignment = await AssignmentModel.create({
      class: class_id,
      title,
      description,
      due_date,
      documentation,
    })

    res.status(200).json({
      error_code: 0,
      message: "Success",
      status_code: 200,
      data: newAssignment,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

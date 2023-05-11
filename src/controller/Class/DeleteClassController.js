import ClassModel from "@/model/ClassModel";
import RegisterClassModel from "@/model/RegisterClassModel";

export default async function (req, res) {
  const { class_id } = req.body;

  try {
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

    const deleteRegisterClass = RegisterClassModel.deleteMany({
      class: class_id,
    });
    const deleteClass = ClassModel.deleteOne({ _id: class_id });

    await Promise.all([deleteRegisterClass, deleteClass]);

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

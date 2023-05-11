import ClassModel from "@/model/ClassModel";

export default async function (req, res) {
  try {
    const { class_id } = req.body;
    if (!class_id) {
      return res.status(200).json({
        error_code: 2000,
        message: "Class id is not valid",
      });
    }
    const hasClass = await ClassModel.findOne({ _id: class_id });

    if (!hasClass) {
      return res.status(200).json({
        error_code: 2001,
        message: "Class is not found",
      });
    }

    res.status(200).json({
      error_code: 0,
      message: "Success",
      status_code: 200,
      data: hasClass,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

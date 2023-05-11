import RegisterClassModel from "@/model/RegisterClassModel";

export default async function (req, res) {
  try {
    const { class_id } = req.body;
    if (!class_id) {
      return res.status(200).json({
        error_code: 2000,
        message: "Class id is not valid",
      });
    }
    const member = await RegisterClassModel.find({ class: class_id })
      .populate("user")
      .populate("class")
      .lean();

    res.status(200).json({
      error_code: 0,
      message: "Success",
      status_code: 200,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

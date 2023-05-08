import ClassModel from "@/model/ClassModel";
import generateString from "@/helper/generateCode";
export default async function (req, res) {
  try {
    const { class_name, description, topic } = req.body;
    if (!class_name) {
      return res.status(200).json({
        error_code: 2000,
        message: "Class name is not valid",
      });
    }

    if (!topic) {
      return res.status(200).json({
        error_code: 2001,
        message: "Topic is not valid",
      });
    }

    const hasClass = await ClassModel.findOne({ class_name }).lean();
    if (hasClass) {
      return res.status(200).json({
        error_code: 2002,
        message: "Class name is exist",
      });
    }

    await ClassModel.create({
      description,
      title: class_name,
      topic,
      class_code: generateString(6),
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

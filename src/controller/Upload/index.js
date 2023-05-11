export default async function (req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(200).json({
        message: "No file uploaded",
      });
    }

    const filePath = `/uploads/${file.filename}`;

    res.status(200).json({
      message: "Success",
      data: filePath,
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

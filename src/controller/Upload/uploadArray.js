export default async function (req, res) {
  try {
    // upload array of files
    const files = req.files;
    if (!files) {
      return res.status(200).json({
        message: "No file uploaded",
      });
    }

    let rs = [];
    for (let i = 0; i < files.length; i++) {
      rs.push(`/uploads/${files[i].filename}`);
    }
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: rs,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

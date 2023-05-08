export default async function (req, res) {
  const { refresh_token } = req.body;

  if (!refresh_token) {
  }

  try {
  } catch (error) {
    return res.status(500).json({
      error_code: 500,
      message: "Internal Server Error",
      error_message: error.message,
    });
  }
}

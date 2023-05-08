import "dotenv/config";
import express from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import router from "@/routes";
import connectDb from "@/utils/DBConnect";

const app = express();

// Static files
app.use(express.static(__dirname + "./src/assets"));

// Body parser
app.use(express.json());

// Morgan for logging
app.use(morgan("dev"));

// Cors for cross origin requests
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// Routes
app.use("/api", router);

// Router not found
app.get("*", (req, res) => {
  res.json({
    message: "Route not found",
    error_code: 404,
    error_message: "Route not found",
  });
});

// Server
const server = http.createServer(app);

connectDb()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

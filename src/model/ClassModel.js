import mongoose from "mongoose";

const ClassModel = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    class_code: {
      type: String,
      trim: true,
    },
    topic: {
      type: String,
      trim: true,
      default: "Chưa có chủ đề",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model("Class", ClassModel);

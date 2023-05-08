import mongoose from "mongoose";

const ClassModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    class_code: {
      type: String,
    },
    topic: {
      type: String,
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

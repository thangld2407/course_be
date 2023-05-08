import mongoose from "mongoose";

const PointModel = new mongoose.Schema(
  {
    point: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assigment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignments",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model("Point", PointModel);

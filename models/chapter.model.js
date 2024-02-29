import mongoose from "mongoose";

const { Schema, model } = mongoose;

const chapterSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      ref:'Course',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true
    },
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
  },
  {
    timestamps: true,
  }
);

export default model("Chapter", chapterSchema);
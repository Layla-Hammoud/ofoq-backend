import mongoose from "mongoose";

const { Schema, model } = mongoose;

const eventSchema = new mongoose.Schema(
  {
    domainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: Number,
    },
    studentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export default model("Event", eventSchema);

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    domainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Domain",
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

export default model("Course", courseSchema);
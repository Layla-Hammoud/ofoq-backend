import mongoose from "mongoose";

const { Schema, model } = mongoose;

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique:true
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

export default model("Resource", resourceSchema);

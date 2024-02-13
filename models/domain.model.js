import mongoose from "mongoose";

const { Schema, model } = mongoose;

const domainSchema = new mongoose.Schema(
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
    skillsDeveloped: {
      type: [String],
      required: true
    },
  },
  {
    timestamps: true,
  }
);

export default model("Domain", domainSchema);

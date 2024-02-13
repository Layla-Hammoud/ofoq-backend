import mongoose from "mongoose";

const { Schema, model } = mongoose;

const studentSchema = new mongoose.Schema(
  {
    studenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    dimainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Domain",
    }
  },
  {
    timestamps: true,
  }
);

export default model("Student", userSchema);
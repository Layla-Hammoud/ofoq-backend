import mongoose from "mongoose";

const { Schema, model } = mongoose;

const teacherSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    yearsOfExperince: {
      type: Number,
    },
    certifications: {
      type: [String],
      default: [],
    },
    socialMedia: {
      type: {
        twitter: String,
        linkedin: String,
      },
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default model("Teacher", teacherSchema);

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const requestedTeacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
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
      required: true,
    },
    socialMedia: {
      type: {
        twitter: String,
        linkedin: String,
      },
      default: {},
    },
    status: {
        type: String,
        enum: ['requested','accepted'],
        default: 'requested',
      },
  },
  {
    timestamps: true,
  }
);

export default model("RequestedTeacher", requestedTeacherSchema);

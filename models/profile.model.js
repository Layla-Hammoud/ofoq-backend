import mongoose from "mongoose";

const { Schema, model } = mongoose;

const profileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    bio: {
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
      required: true,
    },
    socialMedia: {
      type: {
        twitter: String,
        linkedin: String,
      },
      default: {},
    }
  },
  {
    timestamps: true,
  }
);

export default model("Profile", profileSchema);
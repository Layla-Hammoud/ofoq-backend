import mongoose from "mongoose";
import "dotenv/config";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to Database: ", error);
  }
};

export { dbConnect };

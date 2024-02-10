import express from "express";
import "dotenv/config.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { dbConnect } from "./config/db.js";

const app = express();

const corsOptions = {
  origin: "http://local:3000",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());

const port = process.env.PORT || 4000;
dbConnect();

app.listen(port, async () => {
  console.log(`The server is running on port ${port}`);
});

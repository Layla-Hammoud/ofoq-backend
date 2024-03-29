import express from "express";
import domainRouter from "./routes/domain.route.js";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import chapterRouter from "./routes/chapter.route.js";
import resourceRouter from "./routes/resource.route.js";
import eventRouter from "./routes/event.route.js";
import miscellaneousRouter from "./routes/miscellaneous.route.js";
import "dotenv/config.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { dbConnect } from "./config/db.js";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/domain", domainRouter);
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/chapter", chapterRouter);
app.use("/resource", resourceRouter);
app.use("/event", eventRouter);
app.use("/miscellaneous", miscellaneousRouter);

const port = process.env.PORT || 4000;
dbConnect();

app.listen(port, async () => {
  console.log(`The server is running on port ${port}`);
});

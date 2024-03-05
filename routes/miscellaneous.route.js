import express from "express";
import { sendContactForm } from "../controllers/miscellaneous.controller.js";

const miscellaneousRouter = express.Router();

miscellaneousRouter.post("/send-contact-form", sendContactForm);

export default miscellaneousRouter;

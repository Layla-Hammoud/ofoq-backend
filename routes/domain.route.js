import express from "express";
import {
  createDomain,
  getDomains,
  deleteDomain,
  getDomain,
  updateDomain
} from "../controllers/domain.controller.js";
import { uploadImage } from "../middleware/multer.js";

const domainRouter = express.Router();

domainRouter.post("/create", uploadImage.single("image"), createDomain);
domainRouter.get("/get-all", getDomains);
domainRouter.post("/get-one", getDomain);
domainRouter.post("/delete", deleteDomain);
domainRouter.patch("/update", updateDomain);

export default domainRouter;

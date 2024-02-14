import DomainModel from "../models/domain.model.js";
import { deleteImage } from "../utils/imageHelpler.js";
import mongoose from "mongoose";
const createDomain = async (req, res) => {
  try {
    const { name, description, skillsDeveloped } = req.body;
    if (!name || !description || !skillsDeveloped) {
      return res.status(400).json({
        success: false,
        error:
          "Incomplete data. Please provide name and description of the domain and skills developped by the domain ",
        data: null,
      });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "Image is required!", data: null });
    }
    const image = req.file.location;
    const existingDomain = await DomainModel.findOne({
      name: name,
    });
    if (existingDomain) {
      return res.status(400).json({
        success: false,
        error: "Domain name already exists. Please choose a unique name.",
        data: null,
      });
    }
    const newDomain = await DomainModel.create({
      name,
      description,
      image,
      skillsDeveloped,
    });
    res.status(200).json({
      success: true,
      data: newDomain,
      message: "New academic domain has been created successfully.",
    });
  } catch (error) {
    if (req.file) {
      deleteImage(req.file.location);
    }
  }
  res
    .status(500)
    .json({ success: false, error: "error while creating domain", data: null });
};

const getDomains = async (req, res, next) => {
  try {
    const domains = await DomainModel.find({});
    res.status(200).json({
      success: true,
      data: domains,
      message: "All domains retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting domains",
      data: null,
    });
  }
};

const getDomain = async (req, res, next) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      error: "No such Domain",
      data: null,
    });
  }
  try {
    const domain = await DomainModel.find({ _id: id });
    if (!domain) {
      return res.status(200).json({
        success: true,
        data: domain,
        message: "No domain found.",
      });
    }
    res.status(200).json({
      success: true,
      data: domain,
      message: "All domains retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting domain",
      data: null,
    });
  }
};

const deleteDomain = async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: "No such Domain",
        data: null,
      });
    }
    const oldDomain = await DomainModel.find({ _id: id });
    const domain = await DomainModel.findOneAndDelete({ _id: id });
    if (!domain) {
      return res.status(404).json({
        success: false,
        error: "No such Domain",
        data: null,
      });
    }
    if (oldDomain.image) deleteImage(oldDomain);
    res.status(200).json({
      success: true,
      data: domain,
      message: "domain deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while deleting domain",
      data: null,
    });
  }
};
const updateDomain = async (req, res) => {
  try {
    const { id, name, description, skillsDeveloped, oldimageURL } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: "No such Domain",
        data: null,
      });
    }
    let image;
    if (req.file) {
      image = req.file.location;
      deleteImage(oldimageURL);
    }
    const domain = await DomainModel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        skillsDeveloped,
        image,
      },
      { new: true }
    );
    if (!domain) {
      return res.status(404).json({
        success: false,
        error: "No such Domain",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      data: domain,
      message: "domain updated successfully",
    });
  } catch (error) {
    if(req.file)deleteImage(req.file.location);
    return res.status(500).json({
      success: false,
      error: "error while updating domain",
      data: null,
    });
  }
};

export { createDomain, getDomains, deleteDomain, getDomain, updateDomain };

import chapterModel from "../models/chapter.model.js";
import mongoose from "mongoose";
import courseModel from "../models/course.model.js";
const createChapter = async (req, res) => {
  try {
    const { courseId, description, title, number, resources } = req.body;
    if ((!courseId || !description || !title, !number)) {
      return res.status(400).json({
        success: false,
        error:
          "Incomplete data. Please provide course, description, title, number ",
        data: null,
      });
    }
    const newChapter = await chapterModel.create({
      courseId,
      description,
      title,
      number,
      resources,
    });
    return res.status(200).json({
      success: true,
      data: newChapter,
      message: "New chapter has been created successfully.",
    });
  } catch (error) {
    console.log(error);
  }
  return res
    .status(500)
    .json({
      success: false,
      error: "error while creating chapter",
      data: null,
    });
};

const getChapters = async (req, res, next) => {
  try {
    const chapters = await chapterModel.find({});
    return res.status(200).json({
      success: true,
      data: chapters,
      message: "All chapter retrieved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "error while getting chapters",
      data: null,
    });
  }
};

const getChaptersByCourse = async (req, res, next) => {
  const { courseId } = req.body;
  try {
    const course = await courseModel.findById({_id: courseId})
    const chapters = await chapterModel.find({ courseId }).populate('resources')
    return res.status(200).json({
      success: true,
      data: {chapters, course},
      message: "All chapter of the specified course retrieved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "error while getting chapters",
      data: null,
    });
  }
};

const getChapter = async (req, res, next) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      error: "No such chapter",
      data: null,
    });
  }
  try {
    const chapter = await chapterModel.find({ _id: id });
    if (!chapter) {
      return res.status(200).json({
        success: true,
        data: chapter,
        message: "No chapter found.",
      });
    }
    res.status(200).json({
      success: true,
      data: chapter,
      message: "All chapter retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting chapter",
      data: null,
    });
  }
};

const deleteChapter = async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: "No such chapter",
        data: null,
      });
    }
    const chapter = await chapterModel.findOneAndDelete({ _id: id });
    if (!chapter) {
      return res.status(404).json({
        success: false,
        error: "No such chapter",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      data: chapter,
      message: "chapter deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "error while deleting chapter",
      data: null,
    });
  }
};
const updateChapter = async (req, res) => {
  try {
    const {id, courseId, description, title, number, resources } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: "No such chapter",
        data: null,
      });
    }
    const chapter = await chapterModel.findByIdAndUpdate(
      { _id: id },
      {
        courseId,
        description,
        title,
        number,
        resources,
      },
      { new: true }
    );
    if (!chapter) {
      return res.status(404).json({
        success: false,
        error: "No such chapter",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      data: chapter,
      message: "chapter updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "error while updating domain",
      data: null,
    });
  }
};

export { createChapter, getChapters, deleteChapter, getChapter, updateChapter, getChaptersByCourse };

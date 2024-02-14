import { deleteImage } from "../utils/imageHelpler.js";
import UserModel from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";
import profileModel from "../models/profile.model.js";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
const register = async (req, res) => {
  let {
    userName,
    email,
    password,
    role = "student",
    isApproved = false,
    domainId,
    firstName,
    lastName,
    bio,
    city,
    phoneNumber,
    yearsOfExperince,
    certifications,
    socialMedia,
  } = req.body;
  try {
    const verifyEmail = await UserModel.findOne({ email });
    let image;
    if (req.file) {
      image = req.file.location;
    }
    if (verifyEmail) {
      return res.status(401).json({
        success: false,
        error: "Email already used",
        data: null,
      });
    }

    // Check if the userName is already in use
    const existingUserName = await UserModel.findOne({ userName });
    if (existingUserName) {
      return res.status(401).json({
        success: false,
        error: "Username already used",
        data: null,
      });
    }

    email = email.toLowerCase();
    let profileId;
    if (role === "teacher") {
      const newprofile = await profileModel.create({
        firstName,
        lastName,
        bio,
        city,
        phoneNumber,
        yearsOfExperince,
        certifications,
        socialMedia,
      });
      profileId = newprofile._id;
    }
    const newUser = await UserModel.create({
      userName,
      email,
      password,
      role,
      isApproved,
      image,
      profileId,
      domainId,
    });
    const jwtToken = generateToken(newUser);
    res.cookie("accessToken", jwtToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Set to true in production (requires HTTPS)
    });
    return res.status(201).json({
      message: "User successfully created please log in to your account!",
      data: newUser,
      success: true,
    });
  } catch (error) {
    if (req.file) {
      console.log(req.file.location);
      deleteImage(req.file.location);
    }
    return res.status(500).json({
      error: error.message,
      data: null,
      success: false,
    });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return response
        .status(401)
        .json({ success: false, data: null, message: "Email not found" });
    }

    // Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response
        .status(401)
        .json({ success: false, data: null, message: "Incorrect password" });
    }

    // Generate JWT token
    const jwtToken = generateToken(user);

    response.cookie("accessToken", jwtToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Set to true in production (requires HTTPS)
    });

    return response.status(200).json({
      success: true,
      data: null,
      message: "user log in",
    });
  } catch (err) {
    return response.status(401).json({ message: err.message, success: false });
  }
};

const logout = async (request, response) => {
  try {
    response.clearCookie("accessToken");
    response.status(200).json({
      message: "log out successfully",
      data: null,
      success: true,
    });
  } catch {
    return response.status(401).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({
      success: true,
      data: users,
      message: "All users retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting users",
      data: null,
    });
  }
};

const getUser = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await UserModel.find({ _id: id });
    res.status(200).json({
      success: true,
      data: user,
      message: "The user retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting the user",
      data: null,
    });
  }
};

const getTeacherProfile = async (req, res) => {
  const id = req.user.id;
  try {
    const userProfile = await UserModel.find({ _id: id }).populate("profileId");;
    res.status(200).json({
      success: true,
      data: userProfile,
      message: "The user retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while getting the user",
      data: null,
    });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await UserModel.findOneAndDelete({ _id: id });
    if(user.role === 'teacher'){
      await profileModel.findOneAndDelete({ _id: user.profileId });
    }
    res.status(200).json({
      success: true,
      data: user,
      message: "The user deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "error while deleting the user",
      data: null,
    });
  }
};

const updateUser = async (req, res) => {
  const id = req.user.id;
  console.log(id)
  let {
    userName,
    password,
    role,
    isApproved,
    domainId,
    firstName,
    lastName,
    bio,
    city,
    phoneNumber,
    yearsOfExperince,
    certifications,
    socialMedia,
    imageURL,
    profileId
  } = req.body;
  try {
    let image;
    if (req.file) {
      image = req.file.location;
      deleteImage(imageURL)
    }
    if(req.user.role === "teacher"){
       const profile = await profileModel.findByIdAndUpdate(
        { _id: profileId },
        {
          firstName,
          lastName,
          bio,
          city,
          phoneNumber,
          yearsOfExperince,
          certifications,
          socialMedia,
        },
        { new: true }
      );
      console.log(profile)
    }
    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        userName,
        password,
        role,
        isApproved,
        domainId,
        image,
      },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ error: "no such user", data: null, success: false });
    }

    return res.status(201).json({
      message: "User successfully updated",
      data: user, 
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      data: null,
      success: false,
    });
  }
};
export { register, login, logout, getUsers, getUser, deleteUser, updateUser, getTeacherProfile };

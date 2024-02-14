import express from 'express';
import { register, login, logout, getUsers, getUser , deleteUser, updateUser, getTeacherProfile } from '../controllers/user.controller.js';
import { uploadImage } from '../middleware/multer.js';
import { logInValidation, registerValidation } from '../middleware/authValidationMiddlware.js';
import { isAuthenticated, isAuthorizedUser} from '../middleware/authMiddleware.js';
const userRouter = express.Router();

userRouter.get('/get-user',isAuthenticated, getUser);
userRouter.post('/delete',isAuthenticated, deleteUser);
userRouter.get('/get-users',isAuthenticated, getUsers);
userRouter.get('/get-profile',isAuthenticated, getTeacherProfile);
userRouter.put('/update',isAuthenticated, uploadImage.single("image"), updateUser);
userRouter.post('/signup',uploadImage.single("image"), registerValidation, register);
userRouter.post("/log-in", logInValidation, login);
userRouter.post("/log-out",logout)

export default userRouter;
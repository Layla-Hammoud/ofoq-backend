import express from 'express';
import { register, login, getUsers, getUser,getStudents, logout} from '../controllers/userController.js';
// import { upload } from '../middlware/multer.js';
// import { logInValidation, registerValidation } from '../middlware/authvalidationMiddleware.js';
// import { isAuthenticated, isAuthorizedUser} from '../middlware/authMiddleware.js';
const router = express.Router();

router.get('/get-user',isAuthenticated, getUser);
// router.delete('/',isAuthenticated, isAuthorizedUser(['admin']), deleteUser);
router.get('/get-users', isAuthenticated, isAuthorizedUser(['admin']), getUsers);
router.get('/get-students',isAuthenticated, getStudents);
// router.put('/profile', isAuthenticated, upload.single("image"), updateProfile);
router.post('/signup', registerValidation, register);
router.post("/login", logInValidation, login);
router.post("/logout",logout)

export default router;
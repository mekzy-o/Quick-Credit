import { Router } from 'express';
import UserController from '../controllers/userController';
import validateUser from '../middlewares/userValidation';

const authRoutes = Router();
const { userSignup, userLogin } = UserController;
const { signupValidator, loginValidation } = validateUser;

// Router to create user account
authRoutes.post('/signup', signupValidator, userSignup);

// Router to login user account
authRoutes.post('/signin', loginValidation, userLogin);


export default authRoutes;
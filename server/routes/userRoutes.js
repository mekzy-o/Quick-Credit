import express from 'express';
import UserController from '../controllers/userController';
import validateUser from '../middlewares/userValidation';
import Authorization from '../auth/authorization';

const { userSignup, userLogin, adminVerifyUser, adminGetUser } = UserController;
const { signupValidator, loginValidation, verifyUserValidation } = validateUser;
const { verifyUser, verifyAdmin } = Authorization;

const userRoutes = express.Router();

// Router to create user account
userRoutes.post('/signup', signupValidator, userSignup);

// Router to login user account
userRoutes.post('/signin', loginValidation, userLogin);

// Router to verify user
userRoutes.patch('/:email/verify', verifyAdmin, verifyUserValidation, adminVerifyUser);

// Router to get single user application
userRoutes.get('/:email', verifyAdmin, adminGetUser);

export default userRoutes;

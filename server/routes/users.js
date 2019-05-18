import { Router } from 'express';
import UserController from '../controllers/userController';
import validateUser from '../middlewares/userValidation';
import Authorization from '../auth/authorization';

const userRoutes = Router();

const { adminVerifyUser, adminGetUser } = UserController;
const { verifyUserValidation } = validateUser;
const { verifyAdmin } = Authorization;

userRoutes.patch('/:email/verify', verifyAdmin, verifyUserValidation, adminVerifyUser);
userRoutes.get('/:email/', verifyAdmin, adminGetUser);

export default userRoutes;

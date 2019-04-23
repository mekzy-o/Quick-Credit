import express from "express";
import UserController from "../controllers/userController";
import validate from "../middlewares/userValidation";
import expressValidator from "express-validator";

const router = express.Router();

router.use(expressValidator());

const { userSignup } = UserController;
const { signupValidator, emailExist } = validate;

// Router to create user account
router.post("/api/v1/auth/signup", signupValidator, emailExist, userSignup);

export default router;

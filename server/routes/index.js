import express from 'express';
import expressValidator from 'express-validator';
import UserController from '../controllers/userController';
import LoanController from '../controllers/loanController';
import validateUser from '../middlewares/userValidation';
import LoanValidations from '../middlewares/loanValidation';
import Authorization from '../auth/authorization';

const router = express.Router();

router.use(expressValidator());

const { userSignup, userLogin } = UserController;
const {
  loanApply, getLoans, getOneLoan, getUnrepaidLoans,
} = LoanController;
const { signupValidator, loginValidation } = validateUser;
const { loanApplyValidator, queryValidation } = LoanValidations;
const { verifyUser, verifyAdmin } = Authorization;

// Router to create user account
router.post('/api/v1/auth/signup', signupValidator, userSignup);

// Router to login user account
router.post('/api/v1/auth/signin', loginValidation, userLogin);

// Router to create loan
router.post('/api/v1/loans', verifyUser, loanApplyValidator, loanApply);

// Router to get all loan applications
router.get('/api/v1/loans', queryValidation, verifyAdmin, getLoans);

// Router to get single loan application
router.get('/api/v1/loans/:id', verifyAdmin, getOneLoan);


export default router;

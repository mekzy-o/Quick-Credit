import express from 'express';
import expressValidator from 'express-validator';
import UserController from '../controllers/userController';
import LoanController from '../controllers/loanController';
import RepaymentController from '../controllers/repaymentController';
import validateUser from '../middlewares/userValidation';
import LoanValidations from '../middlewares/loanValidation';
import repaymentValidations from '../middlewares/repaymentValidation';
import Authorization from '../auth/authorization';

const router = express.Router();

router.use(expressValidator());

const {
  userSignup,
  userLogin,
  adminVerifyUser,
  resetPassword,
  getAllUsers,
} = UserController;
const {
 loanApply, getLoans, getOneLoan, adminLoanDecision 
} = LoanController;
const {
  signupValidator,
  loginValidation,
  verifyUserValidation,
  resetPasswordValidation,
} = validateUser;
const {
  loanApplyValidator,
  queryValidation,
  adminDecisionValidation,
} = LoanValidations;
const { verifyUser, verifyAdmin } = Authorization;
const { repaymentRecord, getRepaymentRecord } = RepaymentController;
const {
  repaymentRecordValidator,
  repaymentHistoryValidator,
} = repaymentValidations;

// Default Router
router.get('/', (req, res) => res.status(301).redirect('/api/v1'));
router.get('/api/v1', (req, res) =>
  res.status(200).send({
    status: res.statusCode,
    message: 'Welcome to Quick-Credit version 1',
  }),
);

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

// Router to post repayment record
router.post(
  '/api/v1/loans/:id/repayment',
  verifyAdmin,
  repaymentRecordValidator,
  repaymentRecord,
);

// Router to get repayment history
router.get(
  '/api/v1/loans/:id/repayments',
  verifyUser,
  repaymentHistoryValidator,
  getRepaymentRecord,
);

// Router to approve or reject loan
router.patch(
  '/api/v1/loans/:id',
  verifyAdmin,
  adminDecisionValidation,
  adminLoanDecision,
);

// Router to verify user
router.patch(
  '/api/v1/users/:email/verify',
  verifyAdmin,
  verifyUserValidation,
  adminVerifyUser,
);

// Router to reset password
router.post('/api/v1/users/password', resetPasswordValidation, resetPassword);

// Router to get all users
router.get('/api/v1/users', verifyAdmin, getAllUsers);

export default router;

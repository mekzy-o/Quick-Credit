import { Router } from 'express';
import LoanController from '../controllers/loanController';
import LoanValidations from '../middlewares/loanValidation';
import Authorization from '../auth/authorization';

const loanRoutes = Router();
const {
  loanApply, getLoans, getOneLoan, adminLoanDecision,
} = LoanController;
const { loanApplyValidator, queryValidation, adminDecisionValidation } = LoanValidations;
const { verifyUser, verifyAdmin } = Authorization;

// Router to create loan
loanRoutes.post('/', verifyUser, loanApplyValidator, loanApply);

// Router to get all loan applications
loanRoutes.get('/', queryValidation, verifyAdmin, getLoans);

// Router to get single loan application
loanRoutes.get('/:id', verifyAdmin, getOneLoan);

// Router to approve or reject loan
loanRoutes.patch('/:id', verifyAdmin, adminDecisionValidation, adminLoanDecision);

export default loanRoutes;

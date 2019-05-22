import { Router } from 'express';
import LoanController from '../controllers/loanController';
import LoanValidations from '../middlewares/loanValidation';
import RepaymentController from '../controllers/repaymentController';
import repaymentValidations from '../middlewares/repaymentValidation';
import Authorization from '../auth/authorization';

const loanRoutes = Router();
const {
  loanApply, getLoans, getOneLoan, adminLoanDecision,
} = LoanController;
const { loanApplyValidator, queryValidation, getSpecificLoanValidator, adminDecisionValidation } = LoanValidations;
const { repaymentRecord, getRepaymentRecord } = RepaymentController;
const { repaymentRecordValidator, repaymentHistoryValidator } = repaymentValidations;
const { verifyUser, verifyAdmin } = Authorization;


// Router to create loan
loanRoutes.post('/', verifyUser, loanApplyValidator, loanApply);

// Router to get all loan applications
loanRoutes.get('/', queryValidation, verifyAdmin, getLoans);

// Router to get single loan application
loanRoutes.get('/:id', verifyUser, getSpecificLoanValidator, getOneLoan);

// Router to approve or reject loan
loanRoutes.patch('/:id', verifyAdmin, adminDecisionValidation, adminLoanDecision);

// Router to post repayment record
loanRoutes.post('/:id/repayment', verifyAdmin, repaymentRecordValidator, repaymentRecord);

// Router to get repayment history
loanRoutes.get('/:id/repayments', verifyUser, repaymentHistoryValidator, getRepaymentRecord);

export default loanRoutes;

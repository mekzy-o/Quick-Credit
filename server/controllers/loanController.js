/* eslint-disable no-unused-vars */
import moment from 'moment';
import db from '../models/db';
import {
  getUserEmail, createLoan,
  getAllLoans,
  queryAllLoans, getALoan, changeLoanStatus,
} from '../models/queries/loanQueries';
import { userDetails } from '../models/queries/userQueries';
import MessageController from '../helpers/messageHandler';
import EmailController from '../helpers/emailHandler';
/**
 * @class UserController
 * @description Contains methods for users to apply for loan
 * @exports LoanController
 */

class LoanController {
  /**
   * @method loanApply
   * @description creates a loan application
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */

  static async loanApply(req, res) {
    const {
      firstName, lastName, email, amount, tenor,
    } = req.body;

    const loanData = {
      interest: 0.05 * parseInt(amount, 10).toFixed(3),
      get paymentInstallment() {
        return (parseInt((amount), 10) / parseInt(tenor, 10) + this.interest).toFixed(3);
      },
      get balance() {
        return (parseInt(this.paymentInstallment, 10) * parseInt(tenor, 10)).toFixed(3);
      },
      status: 'pending',
      createdOn: moment().format('LLL'),
      repaid: false,
    };
    const findUser = await db.query(userDetails, [req.body.email]);
    if (findUser.rows.length < 1) {
      return res.status(404).send({
        message: 'User does not exist!',
        success: false,
      });
    }
    const findLoan = await db.query(getUserEmail, [req.user.email]);
    if (!findLoan.rows.length || findLoan.rows[findLoan.rows.length - 1].repaid === true) {

      const data = {
        firstName,
        lastName,
        email,
        tenor,
        amount,
        paymentInstallment: loanData.paymentInstallment,
        status: loanData.status,
        balance: loanData.balance,
        interest: loanData.interest,
      };
      const values = [req.user.email, loanData.createdOn, data.tenor, data.amount, data.paymentInstallment, data.balance, data.interest];
      const addLoanData = await db.query(createLoan, values);
      const getAppliedLoan = await db.query(getUserEmail, [req.user.email]);
      const result = getAppliedLoan.rows.length - 1;
      const loanId = getAppliedLoan.rows[result].id;
      return res.status(201).send({
        message: 'Loan Application has been sent successfully',
        success: true,
        data: {
          loanId,
          ...data,
        },
      });
    }

    return res.status(409).send({
      message: 'You already applied for a loan!',
      success: false,
    });
  }

  /**
   * @method getLoans
   * @description gets all loan applications
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static async getLoans(req, res) {
    let { status, repaid } = req.query;
    if (status && repaid) {
      repaid = JSON.parse(repaid);
      const values = [status, repaid];
      const result = await db.query(queryAllLoans, values);
      return res.status(200).send({
        message: 'Loan Retrieved successfully!',
        success: true,
        data: result.rows[0],
      });
    }
    const retrieveLoan = await db.query(getAllLoans);
    return res.status(200).send({
      message: 'Loan retrieved successfully',
      success: true,
      data: [retrieveLoan.rows[0]],
    });
  }

  /**
   * @method getOneLoan
   * @description gets all loan applications
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static async getOneLoan(req, res) {
    const { id } = req.params;
    const result = await db.query(getALoan, [id]);
    if (result.rowCount > 0) {
      return res.status(200).send({
        message: 'Loan retrieved successfully',
        success: true,
        data: [result.rows[0]],
      });
    }
    return res.status(404).send({
      message: 'No Loan with that id exist on database',
      success: false,
    });
  }

  /**
   * @method adminLoanDecision
   * @description gets all loan applications
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static async adminLoanDecision(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    const values = [status, id];
    const getLoan = await db.query(getALoan, [id]);
    if (!getLoan.rows.length) {
      return res.status(404).send({
        message: 'No Loan with that id exist on database',
        success: false,
      });
    }
    if (getLoan.rows[0].status === 'approved') {
      return res.status(409).send({
        message: 'This loan has already been approved',
        success: false,
      });
    }
    const updateLoanStatus = await db.query(changeLoanStatus, values);
    const returnData = await db.query(getALoan, [id]);

    // Send User Email on approval or rejection
    const details = MessageController.loanApprovalMessage(returnData.rows[0], returnData.rows[0].email);
    EmailController.sendMailMethod(details);
    
    return res.status(200).send({
      message: 'Loan Updated Successfully',
      success: true,
      data: returnData.rows[0][0],
    });
  }
}


export default LoanController;

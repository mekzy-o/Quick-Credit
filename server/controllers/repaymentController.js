/* eslint-disable no-unused-vars */
import moment from 'moment';
import EmailController from '../helpers/emailHandler';
import MessageController from '../helpers/messageHandler';
import db from '../models/db';
import {
  getALoan,
  updateBalance,
  updateRepaid,
} from '../models/queries/loanQueries';
import {
  createRepayments,
  retrieveRepayments,
} from '../models/queries/repaymentQueries';

/**
 * @class UserController
 * @description Contains methods for users to apply for loan
 * @exports RepaymentController
 */

class RepaymentController {
  /**
   * @method repaymentRecord
   * @description creates a loan repayment record
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */

  static async repaymentRecord(req, res) {
    const { id } = req.params;
    const paidAmount = parseInt(req.body.paidAmount, 10);

    // query the database to get loan details
    const getLoanDetails = await db.query(getALoan, [id]);
    const result = getLoanDetails.rows[0];

    if (getLoanDetails.rows.length) {
      // Check if Loan status is approved, throw an error if it is not approved
      if (result.status !== 'approved') {
        return res.status(400).send({
          status: 400,
          error: 'This Loan has not yet been approved!',
        });
      }

      const data = {
        loanId: result.id,
        createdOn: moment().format('LLL'),
        amount: result.amount,
        monthlyInstallment: result.paymentinstallment,
        paidAmount,
        balance: result.balance,
      };
      const newBalance = parseInt(data.balance, 10)

      // Throw an error if paidAmount is greater than the balance
      if (paidAmount > data.balance && newBalance !== 0) {
        return res.status(400).send({
          message: 'The Paid Amount exceeds client debt!',
          success: false
        });
      }

      // Throw an error if paidAmount is greater than the balance
      if (paidAmount > data.balance && newBalance === 0) {
        return res.status(400).send({
          message: 'Client has Repaid loan Completely!',
          success: false,
        });
      }
      // Reduce the value of balance if paidAmount is not greater than balance
      if (paidAmount <= data.balance) {
        data.balance -= paidAmount;
        const updateLoan = await db.query(updateBalance, [data.balance, id]);
        const values = [
          data.loanId,
          data.createdOn,
          data.amount,
          data.monthlyInstallment,
          data.paidAmount,
          data.balance,
        ];
        const addRepaymentData = await db.query(createRepayments, values);

        // Change repaid to true when balance is equal to zero
        if (data.balance === 0) {
          const updateStatus = await db.query(updateRepaid, [id]);
          // const addData = await db.query(createRepayments, values);
          return res.status(201).send({
            status: 201,
            message: 'Client has repaid loan fully!',
            data,
          });
        }
        return res.status(200).send({
          status: 200,
          data,
        });
      }
    }
    return res.status(404).send({
      status: 404,
      error: 'No Loan with that id found!',
    });
  }

  /**
   * @method repaymentRecord
   * @description creates a loan repayment record
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static async getRepaymentRecord(req, res) {
    const { id } = req.params;
    const result = await db.query(retrieveRepayments, [id]);
    if (!result.rows.length) {
      return res.status(404).send({
        message: 'No Loan with that id found in repayment database!',
        success: false,
      });
    }
    const getLoan = await db.query(getALoan, [id]);
    if (getLoan.rows[0].useremail !== req.user.email) {
      return res.status(400).send({
        message:
          'Unauthorized access, please check you are entering correct loan Id!',
        success: false,
      });
    }
    return res.status(200).send({
      message: 'Repayment history retrieved successfully',
      success: true,
      data: result.rows,
    });
  }
}
export default RepaymentController;

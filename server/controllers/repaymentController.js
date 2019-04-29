import loans from '../models/loanDb';
import repayments from '../models/repaymentDb';
import EmailController from '../helpers/emailHandler';
import MessageController from '../helpers/messageHandler';

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

  static repaymentRecord(req, res) {
    const { id } = req.params;
    const paidAmount = parseInt(req.body.paidAmount, 10);
    const data = loans.find(loan => loan.id === parseInt(id, 10));

    // if data is found continue to the next if block, else break and return error
    if (data) {
      let newBalance = data.balance;
      const newData = {
        id: repayments.length + 1,
        loanId: data.id,
        createdOn: data.createdOn,
        amount: data.amount,
        monthlyInstallments: data.paymentInstallment,
        paidAmount,
        balance: newBalance,
      };
      newBalance = parseInt(data.balance, 10) - paidAmount;
      if (newBalance === 0) data.repaid = true;
      repayments.push(newData);
      const searchRepayment = repayments.filter(item => item.loanId === parseInt(id, 10));
      const lastRepayment = searchRepayment[searchRepayment.length - 1];
      if (lastRepayment) {
        data.balance = parseInt(lastRepayment.balance, 10) - paidAmount;
        newData.balance = data.balance;
      }
      // Get user transaction details from newData and user email from data
      const details = MessageController.transactionMessage(newData, data.user);
      EmailController.sendMailMethod(details);
      return res.status(201).send({
        status: 201,
        data: [newData],
      });
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

  static getRepaymentRecord(req, res) {
    const { id } = req.params;
    const data = repayments.find(repayment => repayment.id === parseInt(id, 10));
    if (data) {
      const newData = {
        loanId: data.loanId,
        createdOn: data.createdOn,
        monthlyInstallment: data.monthlyInstallments,
        amount: data.amount,
        balance: data.balance,
      };
      return res.status(200).send({
        status: 200,
        data: [newData],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'No Loan with that id found!',
    });
  }

}
export default RepaymentController;

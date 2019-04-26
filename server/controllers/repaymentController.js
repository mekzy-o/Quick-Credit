import loans from '../models/loanDb';
import repaymentDb from '../models/repaymentDb';

/**
 * @class UserController
 * @description Contains methods for users to apply for loan
 * @exports RepaymentController
 */

class RepaymentController {
  /**
   * @method loanApply
   * @description creates a loan application
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */

  static repaymentRecord(req, res) {
    const { id } = req.params;
    const paidAmount = parseInt(req.body.paidAmount, 10);
    const data = loans.find(loan => loan.id === parseInt(id, 10));
    if (data) {
      const newData = {
        id: repaymentDb.length + 1,
        loanId: data.id,
        createdOn: data.createdOn,
        amount: data.amount,
        monthlyInstallments: data.paymentInstallment,
        paidAmount,
        balance: parseInt(data.balance, 10) - paidAmount,
      };
      repaymentDb.push(newData);
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
}
export default RepaymentController;

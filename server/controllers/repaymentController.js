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
    const { paidAmount } = req.body;
    const data = loans.filter(item => item.id === parseInt(id, 10));

    const newData = {
      id: repaymentDb.length + 1,
      loanId: data[0].id,
      createdOn: data[0].createdOn,
      amount: data[0].amount,
      monthlyInstallments: data[0].paymentInstallment,
      paidAmount,
      balance: parseInt(data[0].balance, 10) - parseInt(paidAmount, 10),
    };
    repaymentDb.push(newData);
    return res.status(201).send({
      status: 201,
      newData,
    });
  }
}
export default RepaymentController;

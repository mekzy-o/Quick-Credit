import loans from '../models/loanDb';
import moment from 'moment'
/**
 * @class UserController
 * @description Contains methods for users to apply for loan
 * @exports UserLoanController
 */

class LoanController {
  /**
   * @method loanApply
   * @description creates a loan application
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */

  static loanApply(req, res) {
    const {
 firstName, lastName, email, amount 
} = req.body;

    const tenor = 12;
    const balance = parseInt(amount).toFixed(3);
    const interest = 0.05 * parseInt(amount).toFixed(3);
    const paymentInstallment = (parseInt(amount) / tenor + interest).toFixed(3);
    const status = 'pending';
    const createdOn = moment().format('LLL');
    const repaid = false;
    const loanId = loans.length + 1;

    const data = {
      loanId,
      firstName,
      lastName,
      email,
      tenor,
      amount,
      paymentInstallment,
      status,
      balance,
      interest,
    };

    const newData = {
      id: data.loanId,
      user: req.user.email,
      createdOn,
      status,
      repaid,
      tenor,
      amount,
      paymentInstallment,
      balance,
      interest,
    };
    if (loans.find(loan => loan.user === req.user.email)) {
      return res.status(409).send({
        status: 409,
        error: 'You already applied for a loan!',
      });
    }
    loans.push(newData);
    return res.status(201).send({
      status: 201,
      data,
    });
  }

  /**
   * @method getLoans
   * @description gets all loan applications
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static getLoans(req, res) {
    res.status(200).send({
      status: 200,
      data: loans,
    });
  }
}

export default LoanController;

import moment from 'moment';
import loans from '../models/loanDb';
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

  static loanApply(req, res) {
    const {
      firstName, lastName, email, amount,
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
    let { status, repaid } = req.query;
    if (status && repaid) {
      repaid = JSON.parse(repaid);
      const response = loans.filter(loan => loan.status === status && loan.repaid === repaid);
      return res.status(200).send({
        status: 200,
        data: response,
      });
    }
    return res.status(200).send({
      status: 200,
      data: loans,
    });
  }

  /**
   * @method getLoans
   * @description gets all loan applications
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static getOneLoan(req, res) {
    const { id } = req.params;
    const data = loans.find(loan => loan.id === parseInt(id, 10));
    if (data) {
      return res.status(200).send({
        status: 200,
        data: [data],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'No Loan with that id exist on database',
    });
  }


  static adminLoanDecision(req, res) {
    const { id } = req.params;
    const data = loans.find(loan => loan.id === parseInt(id, 10));
    if (data) {
      data.status = req.body.status;
      const newData = {
        loanId: data.id,
        loanAmount: data.amount,
        tenor: data.tenor,
        monthlyInstallments: data.paymentInstallment,
        status: data.status,
        interest: data.interest,
      };
      return res.status(200).send({
        status: 200,
        data: [newData],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'No Loan with that id exist on database',
    });
  }
}

export default LoanController;

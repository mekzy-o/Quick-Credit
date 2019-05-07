import moment from 'moment';
import users from '../models/userdb';
import loans from '../models/loanDb';
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

  static loanApply(req, res) {
    const {
      firstName, lastName, email, amount, tenor,
    } = req.body;

    // Search data storage  to check if loan already exist by the same user
    if (loans.find(loan => loan.user === req.user.email)) {
      return res.status(409).send({
        status: 409,
        error: 'You already applied for a loan!',
      });
    }

    // declare loan data that are not immutable by user
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

    const data = {
      loanId: loans.length + 1,
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

    // Send user data to admin including loan id and user email
    const newData = {
      id: data.loanId,
      user: req.user.email,
      createdOn: loanData.createdOn,
      status: data.status,
      repaid: loanData.repaid,
      tenor: data.tenor,
      amount: data.amount,
      paymentInstallment: data.paymentInstallment,
      balance: data.balance,
      interest: data.interest,
    };

    loans.push(newData);

    // get client details and send an email to client
    const details = MessageController.loanApplyMessage(data, newData.createdOn);
    EmailController.sendMailMethod(details);
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
   * @returns {array} JSON API Response
   */
  static getLoans(req, res) {
    let { status, repaid } = req.query;

    // check if  status and repaid are in the query of the url
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

    // Search data storage to check if any loan has specified id
    const data = loans.find(loan => loan.id === parseInt(id, 10));

    // if loan exist, return neccessary status code
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

  /**
   * @method adminLoanDecision
   * @description approves or rejects loan applications
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static adminLoanDecision(req, res) {
    const { id } = req.params;
    const data = loans.find(loan => loan.id === parseInt(id, 10));



    if (data) {
      data.status = req.body.status;
      
      if (data.status === 'approved') {
      // Find User that applied for loan
        const userDetails = users.find(user => user.email === data.user);

        // Check the user status, throw error if user is not verified
        if (userDetails.status === 'unverified') {
          return res.status(400).send({
            status: 400,
            error: 'This User has not been verified!',
          });
        }
      }

      const newData = {
        loanId: data.id,
        loanAmount: data.amount,
        tenor: data.tenor,
        monthlyInstallments: data.paymentInstallment,
        status: data.status,
        interest: data.interest,
      };

      // get client details and send client an email upon loan decision
      const details = MessageController.loanApprovalMessage(data, data.user);
      EmailController.sendMailMethod(details);
      return res.status(200).send({
        status: 200,
        data: newData,
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'No Loan with that id exist on database',
    });
  }
}

export default LoanController;

import loans from '../models/loanDb';
import repayments from '../models/repaymentDb';
import EmailController from '../helpers/emailHandler';
import MessageController from '../helpers/messageHandler';

/**
 * @class RepaymentController
 * @description Contains methods for admin to make repayments
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

    // if data is found continue to the next if block, else return error
    if (data) {

      // Check if loan status is approved, throw error if it is not
      if (data.status !== 'approved') {
        return res.status(400).send({
          status: 400,
          error: 'This loan has not yet been approved!',
        });
      }

      // Check if paidAmount is greater than balance, throw error if it is
      if (paidAmount > data.balance) {
        return res.status(400).send({
          status: 400,
          error: 'The Paid Amount exceeds client debt!',
        });
      }

      // if paidAmount is less than balance, proceed to post repayment details
      if (paidAmount <= data.balance) {
        data.balance -= paidAmount;
        const newData = {
          id: repayments.length + 1,
          loanId: data.id,
          createdOn: data.createdOn,
          amount: data.amount,
          monthlyInstallments: data.paymentInstallment,
          paidAmount,
          balance: data.balance,
        };

        // If balance is zero, set repaid status of client's loan to true
        if (data.balance === 0) {
          repayments.push(newData);
          data.repaid = true;
          return res.status(201).send({
            status: 201,
            message: 'Client has repaid loan fully!',
            data: newData,
          });
        }

        // Get user transaction details from newData and user email from data
        const details = MessageController.transactionMessage(newData, data.user);
        EmailController.sendMailMethod(details);

        repayments.push(newData);
        return res.status(201).send({
          status: 201,
          data: newData,
        });
      }
    }
    return res.status(404).send({
      status: 404,
      error: 'No Loan with that id found!',
    });
  }

  /**
   * @method getRepaymentRecord
   * @description get loan repayment history
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static getRepaymentRecord(req, res) {
    const { id } = req.params;
    const data = repayments.filter(
      repayment => repayment.loanId === parseInt(id, 10),
    );
    const user = loans.find(loan => loan.id === parseInt(id, 10));
    if (data.length > 0) {
      // Check if user email is the same with user that applied for loan
      if (req.user.email === user.user) {
        return res.status(200).send({
          status: 200,
          data,
        });
      }
      return res.status(400).send({
        status: 400,
        error: 'Unauthorized access, please check you are entering correct loan Id!',
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'No Loan with that id exist on repayment database',
    });
  }
}
export default RepaymentController;


/**
 * @class MessageController
 * @description Handles all the messages sent to client
 * @exports MessageController
 */

class MessageController {

  /**
  * @method signupMessage
  * @description sends an email notification to the specified email upon signup
  * @param {object} data - The email address, subject & body
  * @returns {object} - The email address, subject & body
  */
  static signupMessage(data) {
    const { email } = data;
    const subject = 'Quick-Credit Mail';
    const body = `<p>
  Dear <em style="text-transform: capitalize">${data.firstName} ${data.lastName}</em>, <br>

 <p>Thank you for signing up with us.</p>
 <p>Quick Credit offers the most affordable loans for individuals earning low income</p>
 <span>Click <a href="#">Here!</a> to get to know us more!</span>
 <br>

 <p><strong>Regards,</strong></p>

 <span>Quick-Credit Team</span><br>
  <span>copyright &copy; 2019</span>
 </p>`;
    return { subject, email, body };
  }

  static transactionMessage(data, email) {
    const subject = 'Quick-Credit Mail';
    const body = `<p>
    <strong>Quick Credit electronic Notification Service (QeNS) alert notice</strong><br>
    Dear <em style="text-transform: capitalize">Customer</em>, <br>
    
    A transaction just occured in your account with the details below
    <table style="border: 1px solid">
      <tr>
        <td style="border: 1px solid">Loan ID</td>
        <td style="border: 1px solid">${data.loanId}</td> 
      </tr>
      <tr>
        <td style="border: 1px solid">Paid Amount</td>
        <td style="border: 1px solid">${data.paidAmount}</td> 
      </tr>
      <tr>
        <td style="border: 1px solid">Transaction Time</td>
        <td style="border: 1px solid">${data.createdOn}</td> 
      </tr>
      <tr>
        <td style="border: 1px solid">Amount</td>
        <td style="border: 1px solid">${data.amount}</td> 
      </tr>
      <tr>
        <td style="border: 1px solid">Balance</td>
        <td style="border: 1px solid">${data.balance}</td> 
      </tr>
    </table>

    <p><strong>Regards,</strong></p>

 <span>Quick-Credit Team</span><br>
  <span>copyright &copy; 2019</span>
 </p>
  </p>`;
    return { subject, body, email };
  }

  /**
  * @method loanApplyMessage
  * @description sends an email notification to the specified email upon loan application
  * @param {object} data - The email address, subject & body
  * @returns {object} - The email address, subject & body
  */
  static loanApplyMessage(data, createdOn) {
    const { email } = data;
    const subject = 'Quick-Credit Mail';
    const body = `<p>
    <strong>Quick Credit electronic Notification Service (QeNS) alert notice</strong><br><br>
    Dear <em style="text-transform: capitalize">${data.firstName} ${data.lastName}</em>, <br>
    
    Your loan application was sent successfully, and would be granted once approved by Admin.

    <p>Here are your loan details for future reference</p>
    <table style="border: 1px solid">
      <tr>
        <td style="border: 1px solid">Loan ID</td>
        <td style="border: 1px solid">${data.loanId}</td> 
      </tr>
      <tr>
        <td style="border: 1px solid">Loan Amount</td>
        <td style="border: 1px solid">${data.amount}</td> 
      </tr>
      <tr>
        <td style="border: 1px solid">Transaction Time</td>
        <td style="border: 1px solid">${createdOn}</td> 
      </tr>
      <tr>
        <td style="border: 1px solid">Tenor</td>
        <td style="border: 1px solid">${data.tenor}</td> 
      </tr>
      <tr>
      <td style="border: 1px solid">Payment Installment</td>
      <td style="border: 1px solid">${data.paymentInstallment}</td> 
    </tr>
      <tr>
        <td style="border: 1px solid">Balance</td>
        <td style="border: 1px solid">${data.balance}</td> 
      </tr>
    </table>

    <p><strong>Regards,</strong></p>

 <span>Quick-Credit Team</span><br>
  <span>copyright &copy; 2019</span>
 </p>
  </p>`;
    return { subject, body, email };
  }

  /**
  * @method loanApprovalMessage
  * @description sends an email notification to the specified email upon loan approval or rejection
  * @param {object} data - The email address, subject & body
  * @returns {object} - The email address, subject & body
  */
  static loanApprovalMessage(data, email) {
    const subject = 'Quick-Credit Mail';
    const body = `<p>
    <strong>Quick Credit electronic Notification Service (QeNS) alert notice</strong><br><br>
    Dear <em style="text-transform: capitalize">Client</em>, <br>
    
    Your loan application has been ${data.status} by Admin.
    

    <p>Here are your loan details for future reference</p>
    <table style="border: 1px solid">
      <tr>
        <td style="border: 1px solid">Loan ID</td>
        <td style="border: 1px solid">${data.id}</td> 
      </tr>
      <tr>
        <td style="border: 1px solid">Loan Amount</td>
        <td style="border: 1px solid">${data.amount}</td> 
      </tr>
      <tr>
        <td style="border: 1px solid">Transaction Time</td>
        <td style="border: 1px solid">${data.createdOn}</td> 
      </tr>
      <tr>
        <td style="border: 1px solid">Tenor</td>
        <td style="border: 1px solid">${data.tenor}</td> 
      </tr>
      <tr>
      <td style="border: 1px solid">Payment Installment</td>
      <td style="border: 1px solid">${data.paymentInstallment}</td> 
    </tr>
      <tr>
        <td style="border: 1px solid">Balance</td>
        <td style="border: 1px solid">${data.balance}</td> 
      </tr>
    </table>

    <p>Thank you for using Quick-Credit</p>

    <p><strong>Regards,</strong></p>

 <span>Quick-Credit Team</span><br>
  <span>copyright &copy; 2019</span>
 </p>
  </p>`;
    return { subject, body, email };
  }
}

export default MessageController;

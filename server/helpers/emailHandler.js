import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @class EmailController
 * @description Handles all the mailing needs of the app
 * @exports EmailController
 */
class EmailController {

  /**
  * @method sendMailMethod
  * @description sends an email notification to the specified email address
  * @param {object} message - The email address, subject & body
  * @returns {*} nothing
  */
  static sendMailMethod(message) {
    const response = message;
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.SERVER_MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: 'emekaofe22@gmail.com',
      to: response.email,
      subject: response.subject,
      html: response.body,
    };

    transport.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      }
      console.log('messageSent!');
    });
  }
}

export default EmailController;

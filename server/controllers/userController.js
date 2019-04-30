import users from '../models/userdb';
import Authenticator from '../auth/authentication';
import EmailController from '../helpers/emailHandler';
import MessageController from '../helpers/messageHandler';

/**
 * @class UserController
 * @description Contains methods for each user related endpoint
 * @exports UserController
 */

class UserController {
  /**
   * @method userSignup
   * @description creates a user account
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static userSignup(req, res) {
    const {
      email, firstName, lastName, password, address,
    } = req.body;
    const id = users.length + 1;
    const status = 'unverified';
    const isAdmin = false;

    const token = Authenticator.createToken({
      id,
      email,
      status,
      isAdmin,
    });

    const data = {
      token,
      id,
      email,
      firstName,
      lastName,
      password: Authenticator.hashPassword(password),
      address,
      status,
      isAdmin,
    };

    if (users.find(user => user.email === email)) {
      return res.status(409).send({
        status: 409,
        error: 'Email already exists!',
      });
    }
    users.push(data);
    const details = MessageController.signupMessage(data);
    EmailController.sendMailMethod(details);
    return res.status(201).send({
      status: 201,
      data,
    });

  }

  static userLogin(req, res) {
    const { email, password } = req.body;
    const emailIndex = users.findIndex(user => user.email === email);

    if (emailIndex !== -1) {
      const comparePassword = Authenticator.verifyPassword(
        password,
        users[emailIndex].password,
      );
      if (comparePassword) {
        return res.status(200).send({
          message: 'Login Successful!',
          status: 200,
          data: users[emailIndex],
        });
      }
    }
    return res.status(400).json({
      status: 400,
      error: 'Invalid Email or Password Inputed!',
    });
  }

  static adminVerifyUser(req, res) {
    const { email } = req.params;
    const data = users.find(user => user.email === email);
    if (data) {
      data.status = 'verified';
      const newData = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        address: data.address,
        status: data.status,
        isAdmin: data.isAdmin,
      };
      return res.status(200).send({
        status: 200,
        data: [newData],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Email does not exists!',
    });
  }

  static resetPassword(req, res) {

    const { email } = req.body;
    const { password } = req.body;
    const data = users.find(user => user.email === email);

    if (data) {
      data.password = Authenticator.hashPassword(password);
      return res.status(201).send({
        status: 201,
        message: 'Your Password has been reset Successfully!',
      });

    }
    return res.status(404).send({
      status: 404,
      error: 'The Email Address you Entered was not found!',
    });
  }


}

export default UserController;

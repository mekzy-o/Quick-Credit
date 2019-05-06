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
 email, firstName, lastName, password, address 
} = req.body;

    // Search data storage to check if email already exist
    if (users.find(user => user.email === email)) {
      return res.status(409).send({
        status: 409,
        error: 'Email already exists!',
      });
    }

    const id = users.length + 1;
    const status = 'unverified';
    const isAdmin = false;

    // Create token with specified user details as payload
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

    users.push(data);

    // Send User(Client) an email on successful signup
    const details = MessageController.signupMessage(data);
    EmailController.sendMailMethod(details);

    return res.status(201).send({
      status: 201,
      data,
    });
  }

  /**
   * @method userLogin
   * @description logs in a user account
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static userLogin(req, res) {
    const { email, password } = req.body;
    // Search data storage to check if email excist
    const emailIndex = users.findIndex(user => user.email === email);

    // if email index is not -1, check the password entered and compare with user input
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
    // Throw error if email or password is invalid
    return res.status(400).json({
      status: 400,
      error: 'Invalid Email or Password Inputed!',
    });
  }

  /**
   * @method adminVerifyUser
   * @description method for admin to verify a user or client
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static adminVerifyUser(req, res) {
    const { email } = req.params;

    // Search if user exist in data storage
    const data = users.find(user => user.email === email);

    // if user exist, set user status to verified
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
        data: newData,
      });
    }

    // Throw error if user doesn't exist
    return res.status(404).send({
      status: 404,
      error: 'Email does not exists!',
    });
  }

  /**
   * @method resetPassword
   * @description reset a user password
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
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

  /**
   * @method getAllUsers
   * @description return all user accounts
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static getAllUsers(req, res) {

    // declare empty array to hold the values of user
    const data = [];

    // use a forEach loop to add only neccessary user details to the data array
    users.forEach((user) => {
      data.push({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        status: user.status,
      });
    });
    return res.status(200).send({
      status: 200,
      data,
    });
  }
}

export default UserController;

/* eslint-disable no-unused-vars */
import db from '../models/db';
import Authenticator from '../auth/authentication';
import EmailController from '../helpers/emailHandler';
import MessageController from '../helpers/messageHandler';
import {
  createUser,
  userDetails,
  verifyUser,
  getUserEmail,
} from '../models/queries/userQueries';

/**
 * @class UserController
 * @description Contains methods for each user related endpoint
 * @exports UserController
 */

class UserController {
  /**
   * @method createUser
   * @description creates a user account
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static async userSignup(req, res) {
    const {
 firstName, lastName, email, address 
} = req.body;

    const findUser = await db.query(userDetails, [email]);
    if (findUser.rowCount > 0) {
      return res.status(409).json({
        message: 'Email already exist!',
        success: false,
      });
    }

    const password = await Authenticator.hashPassword(req.body.password);
    const values = [firstName, lastName, email, password, address];

    const result = await db.query(createUser, values);
    const user = result.rows[0];
    console.log(user);

    const token = Authenticator.createToken({
      id: user.id,
      isAdmin: user.isadmin,
      email,
    });

    // Send User(Client) an email on successful signup
    const details = MessageController.signupMessage(user);
    EmailController.sendMailMethod(details);

    return res
      .header('x-auth-token', token)
      .status(201)
      .json({
        message: 'Your Account was created successfully',
        success: true,
        data: {
          token,
          ...user,
        },
      });
  }

  static async userLogin(req, res) {
    /**
     * @method userLogin
     * @description enters an existing user account
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */

    const { email, password } = req.body;
    const emailQuery = await db.query(userDetails, [email]);
    if (!emailQuery.rows.length) {
      return res.status(400).json({
        message: 'Invalid Email or Password Inputed!',
        success: false,
      });
    }

    const userPassword = await Authenticator.verifyPassword(
      password,
      emailQuery.rows[0].password,
    );
    if (!emailQuery.rows[0] || userPassword === false) {
      return res.status(400).json({
        message: 'Invalid Email or Password Inputed!',
        success: false,
      });
    }
    const user = { ...emailQuery.rows[0] };
    const token = Authenticator.createToken({
      id: user.id,
      isAdmin: user.isadmin,
      email,
    });

    return res
      .header('x-auth-token', token)
      .status(200)
      .json({
        message: 'You are Logged in Successfully!',
        success: true,
        data: {
          token,
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          address: user.address,
          status: user.status,
          isAdmin: user.isadmin,
        },
      });
  }

  static async adminGetUser(req, res) {
    const { email } = req.params;
    const emailQuery = await db.query(userDetails, [email]);

    if (!emailQuery.rows.length) {
      return res.status(404).json({
        message: 'Email does not exist in database!',
        success: false,
      });
    }
    const result = await db.query(userDetails, [email]);
    return res.status(200).json({
      message: 'User retrieved successfully!',
      success: true,
      data: result.rows[0],
    });
  }

  static async adminVerifyUser(req, res) {
    /**
     * @method adminVerifyUser
     * @description verifies a user account
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
    const { email } = req.params;

    // Check if email exist on database
    const emailQuery = await db.query(userDetails, [email]);
    if (!emailQuery.rows.length) {
      return res.status(404).json({
        message: 'User does not exist!',
        success: false,
      });
    }

    // Check if user is already verified
    if (emailQuery.rows[0].status === 'verified') {
      return res.status(409).json({
        message: 'This User has already been Verified!',
        success: false,
      });
    }

    const result = await db.query(verifyUser, [email]);
    const returnData = await db.query(getUserEmail, [email]);
    const user = returnData.rows[0];
    return res.status(200).json({
      message: 'Client has been verified successfully',
      success: true,
      data: {
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        address: user.address,
        status: user.status,
        isAdmin: user.isadmin,
      },
    });
  }
}

export default UserController;

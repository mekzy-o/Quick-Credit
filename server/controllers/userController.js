import users from '../models/userdb';
import Authenticator from '../auth/authentication';

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
    const status = 'unverified';
    const isAdmin = 'false';

    const token = Authenticator.createToken(req.body);

    const data = {
      token,
      id: users.length + 1,
      email,
      firstName,
      lastName,
      password: Authenticator.hashPassword(password),
      address,
      status,
      isAdmin,
    };

    users.push(data);
    return res.status(201).send({
      status: 201,
      data,
    });
  }

  static userLogin(req, res) {
    const { email } = req.body;
    const findEmail = users.find(user => user.email === email);
    const index = users.findIndex(user => user.email === email);
    if (findEmail && index !== -1) {
      res.status(200).send({
        message: 'Login Successful!',
        status: 200,
        data: users[index],
      });
    }
  }
}

export default UserController;

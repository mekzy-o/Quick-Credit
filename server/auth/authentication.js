import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { SECRET } = process.env;

/**
 * Handles access token generation and verification
 */
class Authenticator {
  /**
   * @description Handles access token generation
   * @param {object} payload - The user credential {id, isAdmin}
   * @return {string} access token
   */
  static createToken(payload) {
    return jwt.sign({ payload }, SECRET, { expiresIn: '24d' });
  }

  /**
   * @description Decodes the access token
   * @param {string} token - The access token
   * @returns {object} payload - the decoded access token
   */
  static verifyToken(token) {
    return jwt.verify(token, SECRET);
  }

  /**
   * @method hashPassword
   * @description Hashes the user inputed password
   * @param {string} password - The user password to be hashed
   * @returns {string} A string of the hashed password
   */
  static hashPassword(password) {
    return bcryptjs.hashSync(password, 10);
  }

  /**
  * @method verifyPassword
  * @description Verifies if the user password is valid by comparing
  * it against the stored hashed password
  * @param {string} plainTextPassword - The plain text password to be verified
  * @param {string} hashedPassword - Stored hashed password to compare against
  * @returns {boolean} Booelean indicating success or failure
  */
  static verifyPassword(plainTextPassword, hashedPassword) {
    return bcryptjs.compareSync(plainTextPassword, hashedPassword);
  }
}

export default Authenticator;

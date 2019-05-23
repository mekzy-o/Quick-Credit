/**
 * @class repaymentValidations
 * @description Contains methods for validating each repayment related endpoint
 * @exports repaymentValidations
 */

class repaymentValidations {
  /**
   * @method repaymentRecordValidor
   * @description validates the loan repayment record
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static repaymentRecordValidator(req, res, next) {
    req
      .checkBody('paidAmount')
      .notEmpty()
      .withMessage('Amount Paid is required!')
      .isNumeric()
      .withMessage('Invalid type of Amount Entered!')
      .isFloat({ gt: 999 })
      .withMessage('Amount Paid must be greater than or equal to N1000');

    req
      .checkParams('id')
      .notEmpty()
      .withMessage('Id parameter is required!')
      .isInt()
      .withMessage('Invalid type of id Entered!');

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        error: errors[0].msg,
      });
    }
    return next();
  }

  /**
   * @method repaymentHistoryValidator
   * @description validates the loan repayment record
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static repaymentHistoryValidator(req, res, next) {
    req
      .checkParams('id')
      .isInt()
      .withMessage('Invalid type of id Entered!');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        error: errors[0].msg,
      });
    }
    return next();
  }
}

export default repaymentValidations;

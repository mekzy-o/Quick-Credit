/**
 * @class repaymentValidations
 * @description Contains methods for validating each repayment related endpoint
 * @exports repaymentValidations
 */

class repaymentValidations {

  static repaymentRecordValidator(req, res, next) {
    req
      .checkBody('paidAmount')
      .notEmpty()
      .withMessage('Amount Paid is required!')
      .isNumeric()
      .withMessage('Invalid type of Amount Entered!');

    req
      .checkParams('id')
      .isNumeric()
      .withMessage('Invalid type of id Entered!');

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    return next();
  }
}

export default repaymentValidations;

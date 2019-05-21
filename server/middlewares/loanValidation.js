/**
 * @class LoanValidations
 * @description Contains methods for validating each loan related endpoint
 * @exports LoanValidations
 */

class LoanValidations {
  static loanApplyValidator(req, res, next) {
    req
      .checkBody('email')
      .notEmpty()
      .withMessage('Email field is required')
      .trim()
      .isEmail()
      .withMessage('Invalid Email Address Entered!')
      .customSanitizer(email => email.toLowerCase());

    req
      .checkBody('firstName')
      .notEmpty()
      .withMessage('First name field is required')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('First name should be between 3 to 15 characters')
      .isAlpha()
      .withMessage('First name should only contain alphabets')
      .customSanitizer(firstName => firstName.toLowerCase());

    req
      .checkBody('lastName')
      .notEmpty()
      .withMessage('Last name field is required')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Last name should be between 3 to 15 characters')
      .isAlpha()
      .withMessage('Last name should only contain alphabets')
      .customSanitizer(lastName => lastName.toLowerCase());

    req
      .checkBody('amount')
      .notEmpty()
      .withMessage('Amount is required')
      .trim()
      .isNumeric()
      .withMessage('Amount should be an integer')
      .isLength({ min: 5, max: 7 })
      .withMessage('Amount should not be less than 10,000');
    req
      .checkBody('tenor')
      .notEmpty()
      .withMessage('tenor is required')
      .trim()
      .isNumeric()
      .withMessage('tenor should be an integer')
      .isInt({ min: 1, max: 12 })
      .withMessage('Tenor must be between 1 and 12 months');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        error: errors[0].msg,
      });
    }
    return next();
  }

  static queryValidation(req, res, next) {
    req.checkQuery('status')
      .optional()
      .isAlpha()
      .withMessage('Invalid type of status entered!')
      .equals('approved')
      .withMessage('Invalid status specified!');
    req.checkQuery('repaid')
      .optional()
      .isAlpha()
      .withMessage('Invalid type of repaid entered!')
      .matches(/^(true|false)$/)
      .withMessage('Invalid repaid entered');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        error: errors[0].msg,
      });
    }
    return next();
  }

  static getSpecificLoanValidator(req, res, next) {
    req.checkParams('id')
      .notEmpty()
      .withMessage('Loan not Found, Please Check you are entering the right id!')
      .isInt()
      .withMessage('Loan not Found, Please Check you are entering the right id!');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        error: errors[0].msg,
      });
    }
    return next();
  }

  static adminDecisionValidation(req, res, next) {
    req
      .checkParams('id')
      .isNumeric()
      .withMessage('Invalid type of id Entered!');
    req
      .checkBody('status')
      .notEmpty()
      .withMessage('Status field is required!')
      .isAlpha()
      .withMessage('Invalid type of status Entered!')
      .matches(/^(approved|rejected)$/)
      .withMessage('Invalid status specified');
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


export default LoanValidations;

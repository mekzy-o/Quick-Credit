/**
 * @class validateUser
 * @description Contains methods for validating each user related endpoint
 * @exports validateUser
 */

class validateUser {
  static signupValidator(req, res, next) {
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
      .withMessage('First name should only contain alphabets');

    req
      .checkBody('lastName')
      .notEmpty()
      .withMessage('Last name field is required')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Last name should be between 3 to 15 characters')
      .isAlpha()
      .withMessage('Last name should only contain alphabets');

    req
      .checkBody('password')
      .notEmpty()
      .withMessage('Password field is required')
      .trim()
      .isLength({ min: 6, max: 15 })
      .withMessage('Password should be between 6 to 15 characters');

    req
      .checkBody('address')
      .notEmpty()
      .withMessage('Address field is required')
      .trim()
      .isLength({ min: 10, max: 50 })
      .withMessage('Address should be between 10 to 50 characters')
      .matches(/^[A-Za-z0-9\.\-\s\,]*$/)
      .withMessage('Invalid Address format entered');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    next();
  }

  static loginValidation(req, res, next) {
    req
      .checkBody('email')
      .notEmpty()
      .withMessage('Email field is required')
      .trim()
      .isEmail()
      .withMessage('Invalid Email Address Entered!')
      .customSanitizer(email => email.toLowerCase());
    req
      .checkBody('password')
      .notEmpty()
      .withMessage('Password field is required');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    return next();
  }

  static verifyUserValidation(req, res, next) {
    req
      .checkParams('email')
      .isEmail()
      .withMessage('Invalid Email Address Entered!')
      .customSanitizer(email => email.toLowerCase());
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


export default validateUser;

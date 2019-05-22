import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {
  correctUser, myAdmin, undefinedFirstName, undefinedAddress,
  invalidFirstNameLength, InvalidAddressCharacter, invalidFirstNameCharacter,
  undefinedLastName, invalidLastNameLength,
  invalidLastNameCharacter, undefinedEmail, invalidAddressLength, emptyEmailField, invalidEmailLength,
  invalidEmailCharacter, existingEmail, undefinedPassword,
  invalidPasswordLength, correctLogin, emptyAddress, emptyEmail,
  emptyFirstName, emptyLastName, undefinedEmailLogin,
  nonExistingEmail, undefinedPasswordLogin, emptyPasswordField, correctEmailIncorrectPassword,
} from './mockData/mockUser';

// chai middleware
chai.use(chaiHttp);

// Define the should assertion
chai.should();
const url = '/api/v1/auth/signup';
const loginUrl = '/api/v1/auth/signin';
const email = 'jamesdoe@gmail.com';
const verifyUrl = `/api/v1/users/${email}/verify`;
const invalidUrl = '/api/v1/users/s/verify';
const notFoundUrl = '/api/v1/users/emekaofe@gmail.com/verify';
const resetUrl = '/api/v1/users/password';




// TEST FOR SIGNUP ROUTE
describe('User Sign Up Tests', () => {
  describe(`POST ${url}`, () => {
    it('Should create a new user account', (done) => {
      chai
        .request(app)
        .post(url)
        .send(correctUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('isadmin');
          done();
        });
    });

    it('Should return 400 if firstName is ommited', (done) => {
      chai
        .request(app)
        .post(url)
        .send(undefinedFirstName)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('First name field is required');
          done();
        });
    });

    it('Should return 400 if email is ommited', (done) => {
      chai
        .request(app)
        .post(url)
        .send(undefinedEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Email field is required');
          done();
        });
    });

    it('Should return 400 if lastName is ommited', (done) => {
      chai
        .request(app)
        .post(url)
        .send(undefinedLastName)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Last name field is required');
          done();
        });
    });
  });

  describe(`POST ${url}`, () => {
    it('Should return 400 if firstName is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send(emptyFirstName)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('First name field is required');
          done();
        });
    });
    it('Should return 400 if lastName is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send(emptyLastName)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Last name field is required');
          done();
        });
    });
  });
  it('Should return 400 if email is empty', (done) => {
    chai
      .request(app)
      .post(url)
      .send(emptyEmail)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Email field is required');
        done();
      });
  });
  it('Should return 400 if address is ommited', (done) => {
    chai
      .request(app)
      .post(url)
      .send(undefinedAddress)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Address field is required');
        done();
      });
  });
});


describe(`POST ${url}`, () => {
  it('Should return 400 if address is ommited', (done) => {
    chai
      .request(app)
      .post(url)
      .send(undefinedAddress)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Address field is required');
        done();
      });
  });

  it('Should return 400 if password is ommited', (done) => {
    chai
      .request(app)
      .post(url)
      .send(undefinedPassword)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Password field is required');
        done();
      });
  });

  it('Should return 400 if First Name is not an alphabet', (done) => {
    chai
      .request(app)
      .post(url)
      .send(invalidFirstNameCharacter)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql(
          'First name should only contain alphabets',
        );
        done();
      });
  });

  it('Should return 400 if Last Name is not an alphabet', (done) => {
    chai
      .request(app)
      .post(url)
      .send(invalidLastNameCharacter)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Last name should only contain alphabets');
        done();
      });
  });

  it('Should return 400 if Invalid Email Address is entered', (done) => {
    chai
      .request(app)
      .post(url)
      .send(invalidEmailCharacter)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Invalid Email Address Entered!');
        done();
      });
  });

  it('Should return 400 if Invalid Address format is entered', (done) => {

    chai
      .request(app)
      .post(url)
      .send(InvalidAddressCharacter)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Invalid Address format entered');
        done();
      });
  });
});

describe(`POST ${url}`, () => {
  it('Should return 400 if address length does not meet the minimum', (done) => {

    chai
      .request(app)
      .post(url)
      .send(invalidAddressLength)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql(
          'Address should be between 10 to 50 characters',
        );
        done();
      });
  });

  it('Should return 400 if First Name length does not meet the minimum', (done) => {
    chai
      .request(app)
      .post(url)
      .send(invalidFirstNameLength)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql(
          'First name should be between 3 to 15 characters',
        );
        done();
      });
  });

  it('Should return 400 if Last Name length does not meet the minimum', (done) => {
    chai
      .request(app)
      .post(url)
      .send(invalidLastNameLength)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql(
          'Last name should be between 3 to 15 characters',
        );
        done();
      });
  });

  it('Should return 400 if Password length does not meet the minimum', (done) => {
    chai
      .request(app)
      .post(url)
      .send(invalidPasswordLength)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql(
          'Password should be between 6 to 15 characters',
        );
        done();
      });
  });

  it('Should return 409 if Email Address already exist', (done) => {
    chai
      .request(app)
      .post(url)
      .send(existingEmail)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('Email already exist!');
        done();
      });
  });
});

// TEST FOR LOGIN ROUTE
describe('User Login Tests', () => {
  describe(`POST ${loginUrl}`, () => {
    it('Should successfully login a user account', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(correctLogin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('isAdmin');
          done();
        });
    });

    it('Should return 400 and deny access if Invalid Email Address is inputed', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(nonExistingEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid Email or Password Inputed!');
          done();
        });
    });

    it('Should return 400 and deny access if Invalid Password is inputed', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(correctEmailIncorrectPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid Email or Password Inputed!');
          done();
        });
    });

    it('Should return 400  if Email field is omitted', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(undefinedEmailLogin)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Email field is required');
          done();
        });
    });

    it('Should return 400  if Email field is empty', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(emptyEmailField)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Email field is required');
          done();
        });
    });

    it('Should return 400  if Password field is omitted', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(undefinedPasswordLogin)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Password field is required');
          done();
        });
    });
    it('Should return 400  if Password field is empty', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(emptyPasswordField)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Password field is required');
          done();
        });
    });
  });
});


// TEST FOR ADMIN TO MARK USER AS VERIFIED
describe(`PATCH ${verifyUrl}`, () => {
  it('Should successfully verify user', (done) => {

    chai
      .request(app)
      .post(loginUrl)
      .send(myAdmin)
      .end((loginErr, loginRes) => {
        const token = `Bearer ${loginRes.body.data.token}`;
        chai
          .request(app)
          .patch(verifyUrl)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
          });
      });
  });
  it('Should return error for invalid character entered for email', (done) => {

    chai
      .request(app)
      .post(loginUrl)
      .send(myAdmin)
      .end((loginErr, loginRes) => {
        const token = `Bearer ${loginRes.body.data.token}`;
        chai
          .request(app)
          .patch(invalidUrl)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid Email Address Entered!');
            done();
          });
      });
  });

  it('Should return error when email is not found ', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send(myAdmin)
      .end((loginErr, loginRes) => {
        const token = `Bearer ${loginRes.body.data.token}`;
        chai
          .request(app)
          .patch(notFoundUrl)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('User does not exist!');
            done();
          });
      });
  });

  it('Should return error when token is not entered', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send(myAdmin)
      .end((loginErr, loginRes) => {
        const token = `Bearer ${loginRes.body.data.token}`;
        chai
          .request(app)
          .patch(verifyUrl)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No Token Provided');
            done();
          });
      });
  });
  it('Should return error when user that is not admin is trying to access route', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send(correctUser)
      .end((loginErr, loginRes) => {
        const token = `Bearer ${loginRes.body.data.token}`;
        chai
          .request(app)
          .patch(verifyUrl)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Only Admin can access this route');
            done();
          });
      });
  });
});


describe(`GET ${verifyUrl}`, () => {
  it('Should successfully return a single user details to admin', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send(myAdmin)
      .end((err, res) => {
        const token = `Bearer ${res.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/users/jamesdoe@gmail.com')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('firstname');
            res.body.data.should.have.property('lastname');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('status');
            res.body.data.should.have.property('address');
            done();
          });
      });
  });
  it('Should return error if Admin trying to fetch a single user doesnt enter token', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send(myAdmin)
      .end((err, res) => {
        const token = `Bearer ${res.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/users/jamesdoe@gmail.com')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No Token Provided');
            done();
          });
      });
  });
  it('Should return error if user that is not an admin tries to get single user', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send(correctUser)
      .end((err, res) => {
        const token = `Bearer ${res.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/users/ngwobiachukwudi@gmail.com')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Only Admin can access this route');
            done();
          });
      });
  });
  it('Should return error if user email is not database', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send(myAdmin)
      .end((err, res) => {
        const token = `Bearer ${res.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/users/emekaofe26@gmail.com')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Email does not exist in database!');
            done();
          });
      });
  });
});



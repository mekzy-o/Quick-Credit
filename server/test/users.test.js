import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
const url = '/api/v1/auth/signup';
const loginUrl = '/api/v1/auth/signin';
const email = 'emekaofe16@gmail.com';
const verifyUrl = `/api/v1/users/${email}/verify`;
const invalidUrl = '/api/v1/users/s/verify';
const notFoundUrl = '/api/v1/users/emekaofe@gmail.com/verify';
const resetUrl = '/api/v1/users/password';


chai.use(chaiHttp);

// TEST FOR SIGNUP ROUTE
describe('User Sign Up Tests', () => {
  describe(`POST ${url}`, () => {
    it('Should create a new user account', (done) => {
      const user = {
        email: 'emekaofe10@gmail.com',
        firstName: 'Emeka',
        lastName: 'Ofe',
        password: 'maths102',
        address: '75, Bode Thomas Street',
      };
      chai
        .request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('isAdmin');
          done();
        });
    });

    it('Should return 400 if firstName is ommited', (done) => {
      const user = {
        email: 'emekaofe7@gmail.com',
        lastName: 'Ofe',
        password: 'maths102',
        address: '75, Bode Thomas Street',
      };
      chai
        .request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('First name field is required');
          done();
        });
    });

    it('Should return 400 if email is ommited', (done) => {
      const user = {
        firstName: 'Emeka',
        lastName: 'Ofe',
        password: 'maths102',
        address: '75, Bode Thomas Street',
      };
      chai
        .request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Email field is required');
          done();
        });
    });

    it('Should return 400 if lastName is ommited', (done) => {
      const user = {
        email: 'emekaofe7@gmail.com',
        firstName: 'Ofe',
        password: 'maths102',
        address: '75, Bode Thomas Street',
      };
      chai
        .request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Last name field is required');
          done();
        });
    });
  });
});


describe(`POST ${url}`, () => {
  it('Should return 400 if address is ommited', (done) => {
    const user = {
      email: 'emekaofe7@gmail.com',
      firstName: 'Emeka',
      lastName: 'Ofe',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Address field is required');
        done();
      });
  });

  it('Should return 400 if password is ommited', (done) => {
    const user = {
      email: 'emekaofe7@gmail.com',
      firstName: 'Emeka',
      lastName: 'Ofe',
      address: '75 Bode Thomas, Surulere',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Password field is required');
        done();
      });
  });

  it('Should return 400 if First Name is not an alphabet', (done) => {
    const user = {
      email: 'emekaofe7@gmail.com',
      firstName: '12345',
      lastName: 'Ofe',
      password: 'maths102',
      address: '75 Bode Thomas, Surulere',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
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
    const user = {
      email: 'emekaofe7@gmail.com',
      firstName: 'Emeka',
      lastName: '1234',
      password: 'maths102',
      address: '75 Bode Thomas, Surulere',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Last name should only contain alphabets');
        done();
      });
  });

  it('Should return 400 if Invalid Email Address is entered', (done) => {
    const user = {
      email: 'emekaofe7@gmail',
      firstName: 'Emeka',
      lastName: 'Ofe',
      password: 'maths102',
      address: '75 Bode Thomas, Surulere',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Invalid Email Address Entered!');
        done();
      });
  });

  it('Should return 400 if Invalid Address format is entered', (done) => {
    const user = {
      email: 'emekaofe7@gmail.com',
      firstName: 'Emeka',
      lastName: 'Ofe',
      password: 'maths102',
      address: '75 Bode Thomas, Surulere*&',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
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
    const user = {
      email: 'emekaofe7@gmail.com',
      firstName: 'Emeka',
      lastName: 'Ofe',
      password: 'maths102',
      address: 'Andela',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
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
    const user = {
      email: 'emekaofe7@gmail.com',
      firstName: 'Em',
      lastName: 'Ofe',
      password: 'maths102',
      address: '75 Bode Thomas, Surulere',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
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
    const user = {
      email: 'emekaofe7@gmail.com',
      firstName: 'Emeka',
      lastName: 'Of',
      password: 'maths102',
      address: '75 Bode Thomas, Surulere',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
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
    const user = {
      email: 'emekaofe7@gmail.com',
      firstName: 'Emeka',
      lastName: 'Ofe',
      password: 'maths',
      address: '75 Bode Thomas, Surulere',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
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
    const user = {
      email: 'emekaofe16@gmail.com',
      firstName: 'Emeka',
      lastName: 'Ofe',
      password: 'maths102',
      address: '75 Bode Thomas, Surulere',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Email already exists!');
        done();
      });
  });
});

// TEST FOR LOGIN ROUTE
describe('User Login Tests', () => {
  describe(`POST ${loginUrl}`, () => {
    it('Should successfully login a user account', (done) => {
      const user = {
        email: 'emekaofe16@gmail.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(user)
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
      const user = {
        email: 'emekaofe1@gmail.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Invalid Email or Password Inputed!');
          done();
        });
    });

    it('Should return 400 and deny access if Invalid Password is inputed', (done) => {
      const user = {
        email: 'emekaofe16@gmail.com',
        password: 'maths104',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(user)
        .end((err, res) => {
          // console.log(res.body.error);
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Invalid Email or Password Inputed!');
          done();
        });
    });

    it('Should return 400  if Email field is omitted', (done) => {
      const user = {
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Email field is required');
          done();
        });
    });

    it('Should return 400  if Password field is omitted', (done) => {
      const user = {
        email: 'emekaofe16@gmail.com',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(user)
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
    const login = {
      email: 'admin@quick-credit.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(login)
      .end((loginErr, loginRes) => {
        const token = `Bearer ${loginRes.body.data.token}`;
        chai
          .request(app)
          .patch(verifyUrl)
          .set('authorization', token)
          .end((err, res) => {
            console.log(res.body.err);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
          });
      });
  });
  it('Should return error for invalid character entered for email', (done) => {
    const login = {
      email: 'admin@quick-credit.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(login)
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
    const login = {
      email: 'admin@quick-credit.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(login)
      .end((loginErr, loginRes) => {
        const token = `Bearer ${loginRes.body.data.token}`;
        chai
          .request(app)
          .patch(notFoundUrl)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Email does not exists!');
            done();
          });
      });
  });

  it('Should return error when token is not entered', (done) => {
    const login = {
      email: 'admin@quick-credit.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(login)
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
    const login = {
      email: 'emekaofe16@gmail.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(login)
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

// TEST FOR RESET PASSWORD
describe('User reset password test', () => {
  describe(`POST ${resetUrl}`, () => {
    it('Should create a new password for user account', (done) => {
      const user = {
        email: 'emekaofe6@gmail.com',
        firstName: 'Emeka',
        lastName: 'Ofe',
        password: 'maths102',
        address: '75, Bode Thomas Street',
      };
      chai
        .request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          const resetDetails = {
            email: 'emekaofe6@gmail.com',
            password: 'maths104',
          };
          chai
            .request(app)
            .post(resetUrl)
            .send(resetDetails)
            .end((err, res) => {
              res.body.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('status');
              res.body.should.have.property('message');
              res.body.message.should.be.eql('Your Password has been reset Successfully!');
              done();
            });
        });
    });
    it('Should return 400 if email is ommited', (done) => {
      const user = {
        email: 'emekaofe7@gmail.com',
        firstName: 'Emeka',
        lastName: 'Ofe',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          const resetDetails = {
            password: 'maths104',
          };
          chai
            .request(app)
            .post(resetUrl)
            .send(resetDetails)
            .end((err, res) => {
              res.body.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('Email field is required');
              done();
            });
        });
    });
    it('Should return 400 if password is ommited', (done) => {
      const user = {
        email: 'emekaofe7@gmail.com',
        firstName: 'Emeka',
        lastName: 'Ofe',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          const resetDetails = {
            email: 'emeka7@gmail.com',
          };
          chai
            .request(app)
            .post(resetUrl)
            .send(resetDetails)
            .end((err, res) => {
              res.body.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('Password field is required');
              done();
            });
        });
    });
  });
});


describe('User reset password test', () => {
  it('Should return 404 if email is not found', (done) => {
    const user = {
      email: 'emekaofe7@gmail.com',
      firstName: 'Emeka',
      lastName: 'Ofe',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        const resetDetails = {
          email: 'emekaofe34@gmail.com',
          password: 'maths104',
        };
        chai
          .request(app)
          .post(resetUrl)
          .send(resetDetails)
          .end((err, res) => {
            res.body.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('The Email Address you Entered was not found!');
            done();
          });
      });
  });
});

describe('Admin should be able to get all users', () => {
  it('Should successfully return user details to admin', (done) => {
    const admin = {
      email: 'admin@quick-credit.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(admin)
      .end((err, res) => {
        const token = `Bearer ${res.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/users')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data[0].should.have.property('firstName');
            res.body.data[0].should.have.property('lastName');
            res.body.data[0].should.have.property('email');
            res.body.data[0].should.have.property('status');
            res.body.data[0].should.have.property('address');
            done();
          });
      });
  });
  it('Should return error if Admin doesnt enter token', (done) => {
    const admin = {
      email: 'admin@quick-credit.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(admin)
      .end((err, res) => {
        const token = `Bearer ${res.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/users')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No Token Provided');
            done();
          });
      });
  });
  it('Should return error if user that is not an admin tries to get users', (done) => {
    const admin = {
      email: 'emekaofe22@gmail.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(admin)
      .end((err, res) => {
        const token = `Bearer ${res.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/users')
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
  it('Should successfully return a single user details to admin', (done) => {
    const admin = {
      email: 'admin@quick-credit.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(admin)
      .end((err, res) => {
        const token = `Bearer ${res.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/users/emekaofe22@gmail.com')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('firstName');
            res.body.data.should.have.property('lastName');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('status');
            res.body.data.should.have.property('address');
            done();
          });
      });
  });
  it('Should return error if Admin trying to fetch a single user doesnt enter token', (done) => {
    const admin = {
      email: 'admin@quick-credit.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(admin)
      .end((err, res) => {
        const token = `Bearer ${res.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/users/emekaofe22@gmail.com')
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
    const admin = {
      email: 'emekaofe22@gmail.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(admin)
      .end((err, res) => {
        const token = `Bearer ${res.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/users/emekaofe22@gmail.com')
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
    const admin = {
      email: 'admin@quick-credit.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(admin)
      .end((err, res) => {
        const token = `Bearer ${res.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/users/emekaofe26@gmail.com')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Email does not exist!');
            done();
          });
      });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

const url = '/api/v1/loans';
const loginUrl = '/api/v1/auth/signin';
const signupUrl = '/api/v1/auth/signup';
const repaidUrl = '/api/v1/loans?status=approved&repaid=true';
const unrepaidUrl = '/api/v1/loans?status=approved&repaid=false';
const wrongStatusUrl = '/api/v1/loans?status=approve&repaid=true';
const wrongRepaidUrl = '/api/v1/loans?status=approved&repaid=good';
const wrongStatusType = '/api/v1/loans?status=1&repaid=true';
const wrongRepaidType = '/api/v1/loans?status=approved&repaid=1';

// TEST FOR LOAN APPLICATION ROUTES
describe('Tests for Loan Endpoint', () => {
  describe(`POST ${url}`, () => {
    it('Should throw error if user is not authenticated', (done) => {
      const user = {
        firstName: 'Emeka',
        lastName: 'Ofe',
        email: 'emekaofe7@gmail.com',
        amount: 200000,
      };
      chai
        .request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('error');
          res.body.should.be.a('object');
          res.body.error.should.be.eql('Invalid or No token provided');
          done();
        });
    });

    it('Should create loan application successful', (done) => {
      const user = {
        email: 'emekaofe7@gmail.com',
        firstName: 'Emeka',
        lastName: 'Ofe',
        password: 'maths102',
        address: '75, Bode Thomas Street',
      };
      chai
        .request(app)
        .post(signupUrl)
        .send(user)
        .end((signupErr, signupRes) => {

          const login = {
            email: 'emekaofe7@gmail.com',
            password: 'maths102',
          };
          chai
            .request(app)
            .post(loginUrl)
            .send(login)
            .end((loginErr, loginRes) => {
              //   console.log(loginRes.body.data);
              const token = `Bearer ${loginRes.body.data.token}`;
              const applyLoan = {
                firstName: 'Emeka',
                lastName: 'Ofe',
                email: 'emekaofe7@gmail.com',
                amount: 200000,
              };
              chai
                .request(app)
                .post(url)
                .set('authorization', token)
                .send(applyLoan)
                .end((err, res) => {
                  res.body.should.be.a('object');
                  res.should.have.status(201);
                  res.body.should.have.property('data');
                  done();
                });
            });
        });
    });

    it('Should throw error if email is omitted', (done) => {
      const login = {
        email: 'emekaofe7@gmail.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(login)
        .end((loginErr, loginRes) => {
          //   console.log(loginRes.body.data);
          const token = `Bearer ${loginRes.body.data.token}`;
          const applyLoan = {
            firstName: 'Emeka',
            lastName: 'Ofe',
            amount: 200000,
          };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(applyLoan)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.should.have.status(400);
              res.body.should.have.property('error');
              res.body.error.should.eql('Email field is required');
              done();
            });
        });
    });
    it('Should throw error if First name Omitted', (done) => {
      const login = {
        email: 'emekaofe7@gmail.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const applyLoan = {
            lastName: 'Ofe',
            email: 'emekaofe7@gmail.com',
            amount: 'abc',
          };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(applyLoan)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.should.have.status(400);
              res.body.should.have.property('error');
              res.body.error.should.eql('First name field is required');
              done();
            });
        });
    });
    it('Should throw error if First name is less than 3 characters', (done) => {
      const login = {
        email: 'emekaofe7@gmail.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const applyLoan = {
            firstName: 'Of',
            lastName: 'Ofe',
            email: 'emekaofe7@gmail.com',
            amount: 200000,
          };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(applyLoan)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.should.have.status(400);
              res.body.should.have.property('error');
              res.body.error.should.eql('First name should be between 3 to 15 characters');
              done();
            });
        });
    });
    it('Should throw error if invalid First name is entered', (done) => {
      const login = {
        email: 'emekaofe7@gmail.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const applyLoan = {
            firstName: 1234,
            lastName: 'Ofe',
            email: 'emekaofe7@gmail.com',
            amount: 200000,
          };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(applyLoan)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.should.have.status(400);
              res.body.should.have.property('error');
              res.body.error.should.eql('First name should only contain alphabets');
              done();
            });
        });
    });
    it('Should throw error if invalid Last name is entered', (done) => {
      const login = {
        email: 'emekaofe7@gmail.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const applyLoan = {
            firstName: 'Emeka',
            lastName: 1234,
            email: 'emekaofe7@gmail.com',
            amount: 200000,
          };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(applyLoan)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.should.have.status(400);
              res.body.should.have.property('error');
              res.body.error.should.eql('Last name should only contain alphabets');
              done();
            });
        });
    });
    it('Should throw error if Last name is less than 3 characters', (done) => {
      const login = {
        email: 'emekaofe7@gmail.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(login)
        .end((loginErr, loginRes) => {
          //   console.log(loginRes.body.data);
          const token = `Bearer ${loginRes.body.data.token}`;
          const applyLoan = {
            firstName: 'Emeka',
            lastName: 'Of',
            email: 'emekaofe7@gmail.com',
            amount: 200000,
          };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(applyLoan)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.should.have.status(400);
              res.body.should.have.property('error');
              res.body.error.should.eql('Last name should be between 3 to 15 characters');
              done();
            });
        });
    });
    it('Should throw error if Amount name is omitted', (done) => {
      const login = {
        email: 'emekaofe7@gmail.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const applyLoan = {
            firstName: 'Emeka',
            lastName: 'Ofe',
            email: 'emekaofe@gmail.com',
          };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(applyLoan)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.should.have.status(400);
              res.body.should.have.property('error');
              res.body.error.should.eql('Amount is required');
              done();
            });
        });
    });
    it('Should throw error if Last name is omitted', (done) => {
      const login = {
        email: 'emekaofe7@gmail.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const applyLoan = {
            firstName: 'Emeka',
            email: 'emekaofe@gmail.com',
            amount: 200000,
          };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(applyLoan)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.should.have.status(400);
              res.body.should.have.property('error');
              res.body.error.should.eql('Last name field is required');
              done();
            });
        });
    });
    it('Should throw error if Amount is not an integer', (done) => {
      const login = {
        email: 'emekaofe7@gmail.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const applyLoan = {
            firstName: 'Emeka',
            lastName: 'Ofe',
            email: 'emekaofe7@gmail.com',
            amount: 'abc',
          };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(applyLoan)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.should.have.status(400);
              res.body.should.have.property('error');
              res.body.error.should.eql('Amount should be an integer');
              done();
            });
        });
      it('Should throw error if Amount is not an integer', (done) => {
        const login = {
          email: 'emekaofe7@gmail.com',
          password: 'maths102',
        };
        chai
          .request(app)
          .post(loginUrl)
          .send(login)
          .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
            const applyLoan = {
              firstName: 'Emeka',
              lastName: 'Ofe',
              email: 'emekaofe7@gmail.com',
              amount: 1000,
            };
            chai
              .request(app)
              .post(url)
              .set('authorization', token)
              .send(applyLoan)
              .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                res.body.should.have.property('error');
                res.body.error.should.eql('Amount should not be less than 10,000');
                done();
              });
          });
      });
    });
  });
});

describe(`POST ${url}`, () => {
  it('Should throw error if user applies for loan more than once', (done) => {
    const user = {
      email: 'emekaofe7@gmail.com',
      firstName: 'Emeka',
      lastName: 'Ofe',
      password: 'maths102',
      address: '75, Bode Thomas Street',
    };
    chai
      .request(app)
      .post(signupUrl)
      .send(user)
      .end((signupErr, signupRes) => {

        const login = {
          email: 'emekaofe7@gmail.com',
          password: 'maths102',
        };
        chai
          .request(app)
          .post(loginUrl)
          .send(login)
          .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
            const applyLoan = {
              firstName: 'Emeka',
              lastName: 'Ofe',
              email: 'emekaofe7@gmail.com',
              amount: 200000,
            };
            chai
              .request(app)
              .post(url)
              .set('authorization', token)
              .send(applyLoan)
              .end((err, res) => {
                chai
                  .request(app)
                  .post(url)
                  .set('authorization', token)
                  .send(applyLoan)
                  .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.eql('You already applied for a loan!');
                    done();
                  });
              });
          });
      });
  });
});

describe(`POST ${url}`, () => {
  it('Should throw error if user is not authenticated', (done) => {
    const userLogin = {
      email: 'emekaofe16@gmail.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(userLogin)
      .end((loginErr, loginRes) => {
        const token = `Bearer ${loginRes.body.data.token}`;
        const applyLoan = {
          firstName: 'Emeka',
          lastName: 'Ofe',
          email: 'emekaofe7@gmail.com',
          amount: 200000,
        };
        chai
          .request(app)
          .post(url)
          .set('authorization', token)
          .send(applyLoan)
          .end((err, res) => {
            chai
              .request(app)
              .post(url)
              .set('authorization', token)
              .send(applyLoan)
              .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.eql('Only Authenticated User can access this route');
                done();
              });
          });
      });
  });
});

// TEST TO GET LOAN APPLICATIONS
describe(`GET ${url}`, () => {
  it('Should return all loan applications', (done) => {
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
          .get(url)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data[0].should.have.property('user');
            res.body.data[0].should.have.property('createdOn');
            done();
          });
      });

  });

  it('Should throw an error if user is not an admin', (done) => {
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
          .get(url)
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

  it('Should throw an error if token was not entered', (done) => {
    const login = {
      email: 'admin@quick-credit.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(login)
      .end((loginErr, loginRes) => {
        chai
          .request(app)
          .get(url)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No Token Provided');
            done();

          });
      });
  });

  it('Should return a single loan application', (done) => {
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
          .get(`${url}/1`)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data[0].should.have.property('user');
            res.body.data[0].should.have.property('createdOn');
            done();
          });
      });

  });

  it('Should throw an error if token was not entered', (done) => {
    const login = {
      email: 'admin@quick-credit.com',
      password: 'maths102',
    };
    chai
      .request(app)
      .post(loginUrl)
      .send(login)
      .end((loginErr, loginRes) => {
        chai
          .request(app)
          .get(`${url}/1`)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No Token Provided');
            done();

          });
      });
  });

  it('Should throw an error if user is not an admin', (done) => {
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
          .get(`${url}/1`)
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
  it('Should throw an error if loan id does not exist', (done) => {
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
          .get(`${url}/10`)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('No Loan with that id exist on database');
            done();

          });
      });
  });

});


// TEST TO VALIDATE FOR LOAN QUERY PARAMETERS
describe(`GET ${url}`, () => {
  it('Should return all loan applications that are approved and repaid', (done) => {
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
          .get(repaidUrl)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
          });
      });
  });
  it('Should return all loan applications that are approved and not repaid', (done) => {
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
          .get(unrepaidUrl)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
          });
      });
  });

  it('Should return error for wrong status word entered', (done) => {
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
          .get(wrongStatusUrl)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid status specified!');
            done();
          });
      });
  });

  it('Should return error for wrong repaid word entered', (done) => {
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
          .get(wrongRepaidUrl)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid repaid entered');
            done();
          });
      });
  });

  it('Should return error for wrong status type entered', (done) => {
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
          .get(wrongStatusType)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid type of status entered!');
            done();
          });
      });
  });

  it('Should return error for wrong status type entered', (done) => {
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
          .get(wrongRepaidType)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid type of repaid entered!');
            done();
          });
      });
  });
});

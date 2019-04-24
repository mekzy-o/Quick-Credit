import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

const url = '/api/v1/loans';
const loginUrl = '/api/v1/auth/signin';
const signupUrl = '/api/v1/auth/signup';
const randomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiQ2h1a3d1ZGkiLCJsYXN0bmFtZSI6Ik5nd29iaWEiLCJvdGhlcm5hbWUiOiJNaWtlIiwiZW1haWwiOiJuZ3dvYmlhY2h1a3d1ZGlAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwNzA2MDg1NDc3MyIsInBhc3Nwb3J0VXJsIjoiaHR0cHM6Ly9nbWFpbC5jb20vcGFzc3BvcnQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NTExNzYzMzYsImV4cCI6MTU1MTE3OTkzNn0.';

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

// TEST TO GET A LOAN APPLICATION
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

  it('Should throw an error is user is not an admin', (done) => {
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

});



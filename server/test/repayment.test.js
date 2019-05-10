import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

const loanId = 1;
const url = '/api/v1/loans/1/repayment';
const invalidUrl = '/api/v1/loans/s/repayments';
const notFoundId = `/api/v1/loans/${10}/repayments`;
const loginUrl = '/api/v1/auth/signin';
const loanUrl = '/api/v1/loans';
const singleLoan = `/api/v1/loans/${loanId}`;

// TEST TO CREATE REPAYMENT RECORDS
describe(`POST ${url}`, () => {
  it('Should successfully update balance and loan repaid status', (done) => {
    const login = {
      email: 'emekaofe22@gmail.com',
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
          email: 'emekaofe22@gmail.com',
          amount: 200000,
          tenor: 12,
        };
        chai
          .request(app)
          .post(loanUrl)
          .set('authorization', token)
          .send(applyLoan)
          .end((err, res) => {
            const login = {
              email: 'admin@quick-credit.com',
              password: 'maths102',
            };
            chai
              .request(app)
              .post(loginUrl)
              .send(login)
              .end((err, res) => {
                const token = `Bearer ${res.body.data.token}`;
                const amount = { paidAmount: 200000 };
                chai
                  .request(app)
                  .post(url)
                  .set('authorization', token)
                  .send(amount)
                  .end((err, res) => {
                    chai
                      .request(app)
                      .get(singleLoan)
                      .set('authorization', token)
                      .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('data');
                        res.body.data[0].repaid.should.be.eql(true);
                        done();
                      });
                  });
              });
          });
      });
  });

  describe(`POST ${url}`, () => {
    it('Should throw error if user accessing route is not admin', (done) => {
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
          const amount = { paidAmount: 15000 };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(amount)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('Only Admin can access this route');
              done();
            });
        });
    });
    it('Should throw error if no token was entered for post request', (done) => {
      const login = {
        email: 'admin@quick-credit.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(login)
        .end((loginErr, loginRes) => {
          const amount = { paidAmount: 15000 };
          chai
            .request(app)
            .post(url)
            .send(amount)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('Invalid or No Token Provided');
              done();
            });
        });
    });
    it('Should throw error if no paid amount was entered', (done) => {
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
            .post(url)
            .set('authorization', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('Amount Paid is required!');
              done();
            });
        });
    });
    it('Should throw error if paid amount entered is invalid', (done) => {
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
          const amount = { paidAmount: 'abbc' };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(amount)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('Invalid type of Amount Entered!');
              done();
            });
        });
    });
    it('Should throw error if paid amount entered is less than minimum required amount', (done) => {
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
          const amount = { paidAmount: 0 };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(amount)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
    it('Should throw error if paid amount exceeds client debt', (done) => {
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
          const amount = { paidAmount: 8000 };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(amount)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('The Paid Amount exceeds client debt!');
              done();
            });
        });
    });
    it('Should throw error if id is invalid', (done) => {
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
          const amount = { paidAmount: 15000 };
          chai
            .request(app)
            .post('/api/v1/loans/s/repayment')
            .set('authorization', token)
            .send(amount)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('Invalid type of id Entered!');
              done();
            });
        });
    });
    it('Should throw error if loan id is not found for post request', (done) => {
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
          const amount = { paidAmount: 15000 };
          chai
            .request(app)
            .post('/api/v1/loans/10/repayment')
            .set('authorization', token)
            .send(amount)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('No Loan with that id found!');
              done();
            });
        });
    });
  });
});

// TEST TO GET REPAYMENT HISTORY BY USER
describe(`GET ${url}`, () => {
  it('Should throw error when user tries to access another repayment history', (done) => {
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
        chai
          .request(app)
          .get('/api/v1/loans/1/repayments')
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Unauthorized access, please check you are entering correct loan Id!');
            done();
          });
      });
  });
});

describe(`GET ${url}`, () => {
  it('Should throw error if id is invalid', (done) => {
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
          .get(invalidUrl)
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid type of id Entered!');
            done();
          });
      });
  });

  describe(`GET ${url}`, () => {
    it('Should throw error if id is invalid', (done) => {
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
            .get(invalidUrl)
            .set('authorization', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('Invalid type of id Entered!');
              done();
            });
        });
    });
    it('Should throw error if loan id is not found for get request', (done) => {
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
            .get(notFoundId)
            .set('authorization', token)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('No Loan with that id exist on repayment database');
              done();
            });
        });
    });

    it('Should successfully return user repayment history', (done) => {
      const loginAdmin = {
        email: 'admin@quick-credit.com',
        password: 'maths102',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(loginAdmin)
        .end((loginErr, loginRes) => {
          const adminToken = `Bearer ${loginRes.body.data.token}`;
          const amount = { paidAmount: 10000 };
          chai
            .request(app)
            .post('/api/v1/loans/6/repayment')
            .set('authorization', adminToken)
            .send(amount)
            .end((err, res) => {
              const login = {
                email: 'emekaofe18@gmail.com',
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
                    .get('/api/v1/loans/6/repayments')
                    .set('authorization', token)
                    .end((err, res) => {
                      console.log(res.body.error)
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('data');
                      res.body.data[0].should.have.property('balance');
                      res.body.data[0].should.have.property('paidAmount');
                      res.body.data[0].should.have.property('monthlyInstallments');
                      done();
                    });
                });
            });
        });
    });

    it('Should throw error if no token was entered for get request', (done) => {
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
            .get('/api/v1/loans/1/repayments')
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('Invalid or No token provided');
              done();
            });
        });
    });
    it('Should throw error if payment is made to a loan that is not approved', (done) => {
      const login = {
        email: 'emekaofe21@gmail.com',
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
            email: 'emekaofe21@gmail.com',
            amount: 20000,
            tenor: 12,
          };
          chai
            .request(app)
            .post(loanUrl)
            .set('authorization', token)
            .send(applyLoan)
            .end((err, res) => {
              const applyId = `${res.body.data.loanId}`;
              const admin = {
                email: 'admin@quick-credit.com',
                password: 'maths102',
              };
              chai
                .request(app)
                .post(loginUrl)
                .send(admin)
                .end((err, res) => {
                  const adminToken = `Bearer ${res.body.data.token}`;
                  const amount = { paidAmount: 10000 };
                  chai
                    .request(app)
                    .post(`/api/v1/loans/${applyId}/repayment`)
                    .set('authorization', adminToken)
                    .send(amount)
                    .end((err, res) => {
                      res.should.have.status(400);
                      res.body.should.be.a('object');
                      res.body.should.have.property('error');
                      res.body.error.should.be.eql(
                        'This loan has not yet been approved!',
                      );
                      done();
                    });
                });
            });
        });
    });
  });

  describe(`GET ${url}`, () => {
    it('Should throw error if id is invalid', (done) => {
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
            .get(invalidUrl)
            .set('authorization', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.be.eql('Invalid type of id Entered!');
              done();
            });
        });
    });
  });
});

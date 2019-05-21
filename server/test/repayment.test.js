import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { correctUser, myAdmin } from './mockData/mockLoan';

chai.use(chaiHttp);

chai.should();

const loanId = 1;
const url = '/api/v1/loans/1/repayment';
const invalidUrl = '/api/v1/loans/s/repayment';
const notFoundId = `/api/v1/loans/${10}/repayment`;
const loginUrl = '/api/v1/auth/signin';
const loanUrl = '/api/v1/loans';
const repaymentUrl = `/api/v1/loans/${loanId}`;

// TEST TO CREATE REPAYMENT RECORDS
describe(`POST ${url}`, () => {
  it('Should successfully update balance and loan repaid status', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send(myAdmin)
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
              .get(repaymentUrl)
              .send()
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


  describe(`POST ${url}`, () => {
    it('Should throw error if user accessing route is not admin', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(correctUser)
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
    it('Should throw error if no token was entered', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(myAdmin)
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
      chai
        .request(app)
        .post(loginUrl)
        .send(myAdmin)
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
      chai
        .request(app)
        .post(loginUrl)
        .send(myAdmin)
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
      chai
        .request(app)
        .post(loginUrl)
        .send(myAdmin)
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
      chai
        .request(app)
        .post(loginUrl)
        .send(myAdmin)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const amount = { paidAmount: 1000 };
          chai
            .request(app)
            .post(url)
            .set('authorization', token)
            .send(amount)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
            });
        });
    });
    it('Should throw error if id is invalid', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(myAdmin)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const amount = { paidAmount: 15000 };
          chai
            .request(app)
            .post(invalidUrl)
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
    it('Should throw error if loan id is not found', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(myAdmin)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const amount = { paidAmount: 15000 };
          chai
            .request(app)
            .post(notFoundId)
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
// describe(`GET ${url}`, () => {
//   it('Should successfully get loan repayment history', (done) => {
//     const login = {
//       email: 'admin@quick-credit.com',
//       password: 'maths102',
//     };
//     chai
//       .request(app)
//       .post(loginUrl)
//       .send(login)
//       .end((loginErr, loginRes) => {
//         const token = `Bearer ${loginRes.body.data.token}`;
//         chai
//           .request(app)
//           .get(url)
//           .set('authorization', token)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('data');
//             res.body.data[0].should.have.property('loanId');
//             res.body.data[0].should.have.property('createdOn');
//             done();
//           });
//       });
//   });
// });

describe(`GET ${url}`, () => {
  it('Should throw error if id is invalid', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send(correctUser)
      .end((loginErr, loginRes) => {
        const token = `Bearer ${loginRes.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/loans/s/repayments')
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
  it('Should throw error if loan id is not found', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send(correctUser)
      .end((loginErr, loginRes) => {
        const token = `Bearer ${loginRes.body.data.token}`;
        chai
          .request(app)
          .get('/api/v1/loans/10/repayments')
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('No Loan with that id found in repayment database!');
            done();
          });
      });
  });
  it('Should throw error if no token was entered', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send(myAdmin)
      .end((loginErr, loginRes) => {
        chai
          .request(app)
          .get('/api/v1/loans/:id/repayments')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No token provided');
            done();
          });
      });
  });
});


// describe(`GET ${url}`, () => {
//   it('Should throw error if id is invalid', (done) => {
//     const login = {
//       email: 'admin@quick-credit.com',
//       password: 'maths102',
//     };
//     chai
//       .request(app)
//       .post(loginUrl)
//       .send(login)
//       .end((loginErr, loginRes) => {
//         const token = `Bearer ${loginRes.body.data.token}`;
//         chai
//           .request(app)
//           .get(invalidUrl)
//           .set('authorization', token)
//           .end((err, res) => {
//             res.should.have.status(400);
//             res.body.should.be.a('object');
//             res.body.should.have.property('error');
//             res.body.error.should.be.eql('Invalid type of id Entered!');
//             done();
//           });
//       });
//   });

// });

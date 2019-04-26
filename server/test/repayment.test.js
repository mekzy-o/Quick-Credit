import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

const loanId = 1;
const url = '/api/v1/loans/1/repayment';
const invalidUrl = '/api/v1/loans/s/repayment';
const notFoundId = `/api/v1/loans/${10}/repayment`;
const loginUrl = '/api/v1/auth/signin';


// TEST TO CREATE REPAYMENT RECORDS
describe(`POST ${url}`, () => {
  it('Should successfully create loan Application', (done) => {
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
          .post(url)
          .set('authorization', token)
          .send(amount)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data[0].should.have.property('paidAmount');
            res.body.data[0].should.have.property('createdOn');
            done();
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
    it('Should throw error if no token was entered', (done) => {
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



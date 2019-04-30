import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
const url = '/api/v1/auth/signup';
const loginUrl = '/api/v1/auth/signin';
const resetUrl = '/api/v1/users/password';

chai.use(chaiHttp);


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

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
const url = '/api/v1/auth/signup';
const loginUrl = '/api/v1/auth/signin';

chai.use(chaiHttp);

// TEST FOR SIGNUP ROUTE
describe('User Sign Up Tests', () => {
  describe(`POST ${url}`, () => {
    it('Should create a new user account', (done) => {
      const user = {
        email: 'emekaofe7@gmail.com',
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
        console.log(res.body.error);
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
        console.log(res.body.error);
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
        console.log(res.body.error);
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
      email: 'emekaofe7@gmail.com',
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
    it('Should return 400  if Email field is omitted', (done) => {
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

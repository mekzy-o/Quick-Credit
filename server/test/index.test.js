import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

const wrongUrl = '/api/v1/hsfgf%';
const url = '/api/v1';
const redirectUrl = '/';

// TEST FOR DEFAULT ENDPOINTS
describe('Tests for When Endpoint does not exist', () => {
  describe(`GET ${wrongUrl}`, () => {
    it('Should throw an error when wrong endpoint is used', (done) => {
      chai
        .request(app)
        .get(wrongUrl)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Oops! Endpoint not found, Please Check that you are entering the right thing!');
          done();
        });
    });
  });
  it('Should get url successfully', (done) => {
    chai
      .request(app)
      .get(url)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('Welcome to Quick-Credit version 1');
        done();
      });
  });
  it('Should redirect succesffully to the correct url', (done) => {
    chai
      .request(app)
      .get(redirectUrl)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('Welcome to Quick-Credit version 1');
        done();
      });
  });

});



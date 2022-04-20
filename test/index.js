// test/index.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const app = require('../server');
const agent = chai.request.agent(app);

const should = chai.should();

chai.use(chaiHttp);

describe('site', function () {
  // Describe what you are testing
  it('Should have home page', function (done) {
    agent
      .get('/')
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        return done(); // Call done if the test completed successfully.
      });
  });
});
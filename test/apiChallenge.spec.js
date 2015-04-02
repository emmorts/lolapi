var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey);
var expect = require('chai').expect;

describe('api', function () {

  describe('#apiChallenge', function () {

    it('should return a list of urf match ids', function (done) {
      var date = new Date();
      date.setMilliseconds(0);
      date.setSeconds(0);
      date.setMinutes(5);
      var timestamp = Number(date) / 1000;

      api.ApiChallenge.get(timestamp, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        done();
      });
    });

  });

});
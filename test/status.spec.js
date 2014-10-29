var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey);
var expect = require('chai').expect;

describe('api', function () {

  describe('#status', function () {
    var region = 'euw';

    it('should return shard info', function (done) {
      api.Status.get(region, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        done();
      });
    });

    it('should return a shard list', function (done) {
      api.Status.getAll(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result.length).to.be.at.least(5);
        done();
      });
    });

  });

});
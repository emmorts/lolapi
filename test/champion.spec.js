var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey, 'euw');
var expect = require('chai').expect;

describe('api', function () {

  describe('#champion', function () {

    it('should return an error', function (done) {
      api.Champion.get('invalid id', function (error, result) {
        expect(error).to.be.ok;
        expect(result).to.not.be.ok;
        done();
      });
    });

    it('should return all champions', function (done) {
      api.Champion.getAll(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result.champions).to.be.ok;
        expect(result.champions.length).to.be.at.least(10);
        done();
      });
    });

    it('should return all free to play champions', function (done) {
      api.Champion.getAll({ freeToPlay: true }, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result.champions).to.be.ok;
        expect(result.champions).to.have.length(10);
        done();
      });
    });

    it('should return one champion', function (done) {
      var championId = 10;

      api.Champion.get(championId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        done();
      });
    });

  });

});
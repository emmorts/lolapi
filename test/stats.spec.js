var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey);
var expect = require('chai').expect;

describe('api', function () {

  describe('#stats', function () {
    var summonerId = 24643089;

    it('should return summoners ranked stats', function (done) {
      api.Stats.getRanked(summonerId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.modifyDate).to.be.ok;
        expect(result.summonerId).to.equal(summonerId);
        done();
      });
    });

    it('should return summoners stat summary', function (done) {
      api.Stats.getSummary(summonerId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.playerStatSummaries).to.be.ok;
        expect(result.summonerId).to.equal(summonerId);
        done();
      });
    });

  });

});
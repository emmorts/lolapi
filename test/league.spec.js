var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey);
var expect = require('chai').expect;

describe('api', function () {

  describe('#league', function () {

    var summonerIds = ['24643089', '19671824'];

    it('should return a leagues of summoner', function (done) {
      var summonerId = summonerIds[0];

      api.League.getBySummonerId(summonerId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result[summonerId]).to.be.ok;
        done();
      });
    });

    it('should return leagues of each summoner in an array', function (done) {
      api.League.getBySummonerId(summonerIds, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result[summonerIds[0]]).to.be.ok;
        expect(result[summonerIds[1]]).to.be.ok;
        done();
      });
    });

    it('should return ranked solo challenger league', function (done) {
      api.League.getChallenger('RANKED_SOLO_5x5', function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        done();
      });
    });

  });

});
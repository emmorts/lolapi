var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey);
var expect = require('chai').expect;

describe('api', function () {

  describe('#team', function () {
    var summonerIds = [71500, 19531813];

    it('should retrieve summoners teams', function (done) {
      api.Team.getBySummonerId(summonerIds[0], function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result[summonerIds[0]]).to.be.ok;
        done();
      });
    });

    it('should retrieve multiple summoners teams', function (done) {
      api.Team.getBySummonerId(summonerIds, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result[summonerIds[0]]).to.be.ok;
        expect(result[summonerIds[1]]).to.be.ok;
        done();
      });
    });

  });

});
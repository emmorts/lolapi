var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey);
var expect = require('chai').expect;

describe('api', function () {

  describe('#match', function () {

    it('should return a match', function (done) {
      var matchId = 1649939259;

      api.Match.get(matchId, {}, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.region).to.be.ok;
        expect(result.teams).to.be.ok;
        expect(result.matchId).to.equal(matchId);
        done();
      });
    });

    it('should return a match with timeline', function (done) {
      var matchId = 1649939259;

      api.Match.get(matchId, { includeTimeline: true }, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.region).to.be.ok;
        expect(result.teams).to.be.ok;
        expect(result.matchId).to.equal(matchId);
        expect(result.timeline).to.be.an('object');
        done();
      });
    });

  });

});
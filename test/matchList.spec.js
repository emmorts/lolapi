var api = require('./api');
var expect = require('chai').expect;

describe('api', function () {

  describe('#matchList', function () {
    var summonerId = 71054;
    var championIds = [412, 18];
    var rankedQueues = ['RANKED_SOLO_5x5', 'RANKED_TEAM_3x3'];
    var beginIndex = 0;
    var endIndex = 5;

    it('should return match history of a summoner', function (done) {
      api.MatchList.getBySummonerId(summonerId, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.matches).to.be.ok;
        expect(result.matches.length).to.be.at.least(10);
        done();
      });
    });

    it('should return match history of a summoner with matches containing given champions', function (done) {
      api.MatchList.getBySummonerId(summonerId, { championIds: championIds }, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.matches).to.be.ok;
        expect(championIds).to.include(result.matches[0].champion);
        done();
      });
    });

    it('should return match history of a summoner with matches played on given queues', function (done) {
      api.MatchList.getBySummonerId(summonerId, { rankedQueues: rankedQueues }, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.matches).to.be.ok;
        expect(result.matches[0].queue).to.be.ok;
        expect(rankedQueues).to.include(result.matches[0].queue);
        done();
      });
    });

    it('should return a match history of a summoner containing only 5 matches', function (done) {
      var options = {
        beginIndex: beginIndex,
        endIndex: endIndex
      };
      api.MatchList.getBySummonerId(summonerId, options, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.matches).to.be.ok;
        expect(result.matches).to.have.length(5);
        done();
      });
    });

    it('should return a match history of a summoner with multiple parameters set', function (done) {
      var options = {
        championIds: championIds,
        rankedQueues: rankedQueues,
        beginIndex: beginIndex,
        endIndex: endIndex
      };
      api.MatchList.getBySummonerId(summonerId, options, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.matches).to.be.ok;
        done();
      });
    });

  });

});
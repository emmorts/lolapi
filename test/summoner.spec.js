var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey);
var expect = require('chai').expect;

describe('api', function () {

  describe('#summoner', function () {
    var summonerNames = ['wickd', 'froggen'];
    var summonerIds = [71500, 19531813];

    it('should retrieve summoner by id', function (done) {
      api.Summoner.get(summonerIds[0], function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result[summonerIds[0]]).to.be.ok;
        expect(result[summonerIds[0]]).to.be.an('object');
        expect(result[summonerIds[0]].name.toLowerCase()).to.equal(summonerNames[0]);
        done();
      });
    });

    it('should retrieve multiple summoners by id', function (done) {
      api.Summoner.get(summonerIds, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result[summonerIds[0]]).to.be.ok;
        expect(result[summonerIds[1]]).to.be.ok;
        expect(summonerNames).to.include(result[summonerIds[0]].name.toLowerCase());
        expect(summonerNames).to.include(result[summonerIds[1]].name.toLowerCase());
        done();
      });
    });

    it('should retrieve summoner by name', function (done) {
      api.Summoner.getByName(summonerNames[0], function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result[summonerNames[0]]).to.be.ok;
        expect(result[summonerNames[0]]).to.be.an('object');
        expect(result[summonerNames[0]].name.toLowerCase()).to.equal(summonerNames[0]);
        done();
      });
    });

    it('should retrieve multiple summoners by name', function (done) {
      api.Summoner.getByName(summonerNames, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result[summonerNames[0]]).to.be.ok;
        expect(result[summonerNames[0]]).to.be.an('object');
        expect(summonerNames).to.include(result[summonerNames[0]].name.toLowerCase());
        expect(result[summonerNames[1]]).to.be.ok;
        expect(result[summonerNames[1]]).to.be.an('object');
        expect(summonerNames).to.include(result[summonerNames[1]].name.toLowerCase());
        done();
      });
    });

    it('should retrieve summoners name', function (done) {
      api.Summoner.getName(summonerIds[0], function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result[summonerIds[0]].toLowerCase()).to.equal(summonerNames[0]);
        done();
      });
    });

    it('should retrieve multiple summoners names', function (done) {
      api.Summoner.getName(summonerIds, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result[summonerIds[0]]).to.be.ok;
        expect(result[summonerIds[1]]).to.be.ok;
        expect(summonerNames).to.include(result[summonerIds[0]].toLowerCase());
        expect(summonerNames).to.include(result[summonerIds[1]].toLowerCase());
        done();
      });
    });

    it('should retrieve summoners runes', function (done) {
      api.Summoner.getRunes(summonerIds[0], function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result[summonerIds[0]]).to.ok;
        expect(result[summonerIds[0]]).to.be.an('object');
        expect(result[summonerIds[0]].summonerId).to.equal(summonerIds[0]);
        done();
      });
    });

    it('should retrieve multiple summoners runes', function (done) {
      api.Summoner.getRunes(summonerIds, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result[summonerIds[0]]).to.be.ok;
        expect(result[summonerIds[1]]).to.be.ok;
        expect(summonerIds).to.include(result[summonerIds[0]].summonerId);
        expect(summonerIds).to.include(result[summonerIds[1]].summonerId);
        done();
      });
    });

    it('should retrieve summoners masteries', function (done) {
      api.Summoner.getMasteries(summonerIds[0], function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result[summonerIds[0]]).to.ok;
        expect(result[summonerIds[0]]).to.be.an('object');
        expect(result[summonerIds[0]].summonerId).to.equal(summonerIds[0]);
        done();
      });
    });

    it('should retrieve multiple summoners masteries', function (done) {
      api.Summoner.getMasteries(summonerIds, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result[summonerIds[0]]).to.be.ok;
        expect(result[summonerIds[1]]).to.be.ok;
        expect(summonerIds).to.include(result[summonerIds[0]].summonerId);
        expect(summonerIds).to.include(result[summonerIds[1]].summonerId);
        done();
      });
    });

  });

});
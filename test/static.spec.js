var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey);
var expect = require('chai').expect;

describe('api', function () {

  describe('#static', function () {
    var champion = {
       id: 412,
       title: 'the Chain Warden',
       name: 'Thresh'
    };

    it('should return a champion list', function (done) {
      api.Static.getChampions(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.data).to.be.ok;
        done();
      });
    });

    it('should return champion \'Thresh\'', function (done) {
      api.Static.getChampion(champion.id, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.id).to.equal(champion.id);
        expect(result.title).to.equal(champion.title);
        expect(result.name).to.equal(champion.name);
        done();
      });
    });

    it('should return champion stats', function (done) {
      var options = {
        champData: 'stats'
      };

      api.Static.getChampion(champion.id, options, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result).to.be.ok;
        expect(result.id).to.equal(champion.id);
        expect(result.name).to.equal(champion.name);
        expect(result.stats).to.be.ok;
        done();
      });
    });

    it('should return an item list', function (done) {
      api.Static.getItems(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.basic).to.be.ok;
        done();
      });
    });

    it('should return item \'Dagger\'', function (done) {
      var dagger = {
         id: 1042,
         name: 'Dagger'
      }

      api.Static.getItem(dagger.id, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.id).to.equal(dagger.id);
        expect(result.name).to.equal(dagger.name);
        done();
      });
    });

    it('should return a list of masteries', function (done) {
      api.Static.getMasteries(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.data).to.be.ok;
        done();
      });
    });

    it('should return mastery \'Feast\'', function (done) {
      var feast = {
        id: 4124,
        name: 'Feast'
      };

      api.Static.getMastery(feast.id, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.id).to.equal(feast.id);
        expect(result.name).to.equal(feast.name);
        done();
      });
    });

    it('should return a list of runes', function (done) {
      api.Static.getRunes(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.data).to.be.ok;
        done();
      });
    });

    it('should return rune \'Quintessence of Ability Power\'', function (done) {
      var apQuint = {
        'id': 5235,
        'name': 'Quintessence of Ability Power'
      };

      api.Static.getRune(apQuint.id, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.id).to.equal(apQuint.id);
        expect(result.name).to.equal(apQuint.name);
        done();
      });
    });

    it('should return a list of summoner spells', function (done) {
      api.Static.getSummonerSpells(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.data).to.be.ok;
        done();
      });
    });

    it('should return summoner spell \'Heal\'', function (done) {
      var heal = {
         id: 7,
         name: 'Heal'
      };

      api.Static.getSummonerSpell(heal.id, function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.id).to.equal(heal.id);
        expect(result.name).to.equal(heal.name);
        done();
      });
    });

    it('should return version data', function (done) {
      api.Static.getVersions(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result.length).to.be.at.least(10);
        done();
      });
    });

    it('should return realm data', function (done) {
      api.Static.getRealm(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
        expect(result.v).to.be.ok;
        expect(result.dd).to.be.ok;
        expect(result.cdn).to.be.ok;
        expect(result.n).to.be.ok;
        done();
      });
    });

  });

});
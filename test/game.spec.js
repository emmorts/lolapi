var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey);
var expect = require('chai').expect;

describe('#game', function () {
  'use strict';

  it('should return a collection of ten recent games', function (done) {
    var summonerId = 71054;

    api.Game.getBySummonerId(summonerId, {}, function (error, result) {
      expect(error).to.not.be.ok;
      expect(result).to.be.ok;
      expect(result.games).to.be.ok;
      expect(result.games).to.have.length(10);
      done();
    });
  });

});
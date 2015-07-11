var api = require('./api');
var expect = require('chai').expect;

describe('api', function () {

  describe('#featuredGames', function () {

    it('should return featured games', function (done) {
      api.FeaturedGames.get(function (error, result) {
        expect(error).to.not.be.ok;
        expect(result).to.be.ok;
        expect(result.gameList).to.be.ok;
        expect(result.gameList).to.have.length(5);
        done();
      });
    });

  });

});
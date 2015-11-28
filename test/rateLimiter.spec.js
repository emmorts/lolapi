var RateLimiter = require('../lib/rateLimiter');
var api = require('./api');
var expect = require('chai').expect;

describe('util', function () {

  describe('#rateLimiter', function () {

    it('should limit to 10 calls per 500ms', function (done) {
      var limiter = new RateLimiter(10, 500);
      var startedOn = Date.now();
      var count = 0;

      for (var i = 0; i < 21; i++) {
        limiter.schedule(function () {
          expect(Date.now()).to.be.at.least(startedOn + count * 50);

          if (++count === 21) {
            done();
          };
        });
      }

    });

    it('should return featured games 11 times without failure', function (done) {
      var count = 0;

      function getFeaturedGames() {
        api.FeaturedGames.get(function (error, result) {
          expect(error).to.not.be.ok;

          if (++count < 11) {
            getFeaturedGames();
          } else {
            done();
          }
        });
      }

      getFeaturedGames();
    });

  });

});
var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey);
var expect = require('chai').expect;

xdescribe('api', function () {

  describe('summoner', function () {

    it('should test', function () {
      expect(1).to.be.a('number');
    });

  });

});
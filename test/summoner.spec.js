var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey);
var expect = require('chai').expect;

describe('#summoner', function () {
  'use strict';

  it('should test', function () {
    expect(1).to.be.a('number');
  });

});
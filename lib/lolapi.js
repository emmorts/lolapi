module.exports = function (apiKey, region) {
  'use strict';

  var config = require('./config');
  var util = require('./util');

  util.setApiKey(apiKey);
  util.setDefaultRateLimit();

  var api = {};
  api.Champion = require('./api/champion')(region);
  api.Game = require('./api/game')(region);
  api.League = require('./api/league')(region);
  api.Static = require('./api/static')(region);
  api.Match = require('./api/match')(region);
  api.MatchHistory = require('./api/matchHistory')(region);

  api.setRateLimit = function (limitPer10s, limitPer10min) {
    util.setRateLimit(limitPer10s, limitPer10min);
  };

  return api;

};
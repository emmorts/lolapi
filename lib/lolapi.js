module.exports = function (apiKey, region) {
  'use strict';

  var config = require('./config');
  var util = require('./util');

  util.setApiKey(apiKey);
  util.setDefaultRateLimit();

  var api = {};
  api.Champion = {};
  api.Game = {};
  api.League = {};

  api.setRateLimit = function (limitPer10s, limitPer10min) {
    util.setRateLimit(limitPer10s, limitPer10min);
  };

  api.Champion.get = function (championId, options, callback) {
    if (!championId || !util.isInteger(championId)) {
      throw new Error('ID should be an integer. Got: '+ championId);
    }

    options = options || {};
    options.region = options.region || region || config.defaultRegion;
    options.uri = config.uri.champion + '/' + championId;

    var uri = util.craftUri(options);

    util.request(uri, callback);
  };

  api.Champion.getAll = function (options, callback) {
    options = options || {};
    options.region = options.region || region || config.defaultRegion;
    options.uri = config.uri.champion;
    options.query = options.freeToPlay ? 'freeToPlay=true' : null;

    var uri = util.craftUri(options);

    util.request(uri, callback);
  };

  api.Game.getBySummonerId = function (summonerId, options, callback) {
    if (!summonerId || !util.isInteger(summonerId)) {
      throw new Error('ID should be an integer. Got: '+ summonerId);
    }

    options = options || {};
    options.region = options.region || region || config.defaultRegion;
    options.uri = config.uri.game + '/by-summoner/' + summonerId + '/recent';

    var uri = util.craftUri(options);

    util.request(uri, callback);
  };

  api.League.getBySummonerId = function (summonerId, options, callback) {
    if (!summonerId || !(util.isInteger(summonerId) || util.isArrayOfIntegers(summonerId))) {
      throw new Error('ID should be an integer or array of integers. Got: '+ summonerId);
    }
    if (summonerId instanceof Array) {
      summonerId = summonerId.join();
    }

    options = options || {};
    options.region = options.region || region || config.defaultRegion;
    options.uri = config.uri.league + '/by-summoner/' + summonerId;

    var uri = util.craftUri(options);

    util.request(uri, callback);
  };

  api.League.getEntriesBySummonerId = function (summonerId, options, callback) {
    if (!summonerId || !(util.isInteger(summonerId) || util.isArrayOfIntegers(summonerId))) {
      throw new Error('ID should be an integer or array of integers. Got: '+ summonerId);
    }
    if (summonerId instanceof Array) {
      summonerId = summonerId.join();
    }

    options = options || {};
    options.region = options.region || region || config.defaultRegion;
    options.uri = config.uri.league + '/by-summoner/' + summonerId + '/entry';

    var uri = util.craftUri(options);

    util.request(uri, callback);
  };

  api.League.getByTeamId = function (teamId, options, callback) {
    if (!teamId || !(util.isInteger(teamId) || util.isArrayOfIntegers(teamId))) {
      throw new Error('ID should be an integer or array of integers. Got: '+ teamId);
    }
    if (teamId instanceof Array) {
      teamId = teamId.join();
    }

    options = options || {};
    options.region = options.region || region || config.defaultRegion;
    options.uri = config.uri.league + '/by-summoner/' + teamId;

    var uri = util.craftUri(options);

    util.request(uri, callback);
  };

  api.League.getEntriesByTeamId = function (teamId, options, callback) {
    if (!teamId || !(util.isInteger(teamId) || util.isArrayOfIntegers(teamId))) {
      throw new Error('ID should be an integer or array of integers. Got: '+ teamId);
    }
    if (teamId instanceof Array) {
      teamId = teamId.join();
    }

    options = options || {};
    options.region = options.region || region || config.defaultRegion;
    options.uri = config.uri.league + '/by-summoner/' + teamId + '/entry';

    var uri = util.craftUri(options);

    util.request(uri, callback);
  };

  api.League.getChallenger = function (type, options, callback) {
    if (!type || typeof type !== 'string') {
      throw new Error('Invalid challenger league type: ' + type);
    }

    options = options || {};
    options.region = options.region || region || config.defaultRegion;
    options.uri = config.uri.league + '/challenger';
    options.query = 'type=' + type;

    var uri = util.craftUri(options);

    util.request(uri, callback);
  };

  return api;

};
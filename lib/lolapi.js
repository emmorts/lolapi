module.exports = function (apiKey, region) {
  'use strict';

  var config = require('./config');
  var util = require('./util');

  util.setApiKey(apiKey);
  util.setDefaultRateLimit();

  var api = {};
  api.Champion = {};
  api.Game = {};

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
  }

  return api;

};
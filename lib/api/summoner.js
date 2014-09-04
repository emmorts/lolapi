module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    get: function (summonerIds, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.SUMMONER_ID;
      options.id = summonerIds;

      util.exec(options, callback);
    },

    getByName: function (summonerNames, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.SUMMONER_BY_NAME;
      options.names = summonerNames instanceof Array ? summonerNames.join() : summonerNames;

      util.exec(options, callback);
    },

    getName: function (summonerIds, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.SUMMONER_NAME;
      options.id = summonerIds;

      util.exec(options, callback);
    },

    getRunes: function (summonerIds, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.SUMMONER_RUNES;
      options.id = summonerIds;

      util.exec(options, callback);
    },

    getMasteries: function (summonerIds, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.SUMMONER_MASTERIES;
      options.id = summonerIds;

      util.exec(options, callback);
    },


  };

};
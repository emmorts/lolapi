module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    getRanked: function (summonerId, options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.RANKED_STATS;
      options.id = summonerId;
      options.query = {
        season: options.season || null
      };

      util.exec(options, callback);
    },

    getSummary: function (summonerId, options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STAT_SUMMARY;
      options.id = summonerId;
      options.query = {
        season: options.season || null
      };

      util.exec(options, callback);
    },
  };

};
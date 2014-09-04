module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    get: function (teamId, options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.TEAM_ID;
      options.id = teamId;

      util.exec(options, callback);
    },

    getBySummonerId: function (summonerId, options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.TEAM_BY_SUMMONER;
      options.id = summonerId;

      util.exec(options, callback);
    }
  };

};
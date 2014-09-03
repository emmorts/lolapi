module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    get: function (championId, options, callback) {
      if (!championId || !util.isInteger(championId)) {
        throw new Error('ID should be an integer. Got: '+ championId);
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.CHAMPION_ID;
      options.id = championId;

      util.exec(options, callback);
    },

    getAll: function (options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.CHAMPION_LIST;
      options.query = options.freeToPlay ? 'freeToPlay=true' : null;

      util.exec(options, callback);
    }
  };

};
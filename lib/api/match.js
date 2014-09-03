module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    get: function (matchId, options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.MATCH;
      options.id = matchId;
      options.query = {
        includeTimeline: options.includeTimeline || false
      };

      util.exec(options, callback);
    }
  };

};
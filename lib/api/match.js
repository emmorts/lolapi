module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    get: function (matchId, options, callback) {
      if (!matchId || !util.isInteger(matchId)) {
        throw new Error('ID should be an integer. Got: '+ matchId);
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.MATCH;
      options.id = matchId;
      options.query = options.includeTimeline ? 'includeTimeline=true' : null;

      util.exec(options, callback);
    }
  };

};
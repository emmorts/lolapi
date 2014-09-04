module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    getBySummonerId: function (summonerId, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.RECENT_GAMES;
      options.id = summonerId;

      util.exec(options, callback);
    }
  };

};
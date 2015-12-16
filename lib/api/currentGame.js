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
      options.uri = config.uri.CURRENT_GAME;
      options.id = summonerId;
      options.platformId = config.platforms[options.region].id;
      options.endpoint = 'api.pvp.net';

      util.exec(options, callback);
    }
  };

};
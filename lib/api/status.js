module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    get: function (shardName, options, callback) {
      if (arguments.length === 2 && typeof options === 'function') {
        callback = arguments[1];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATUS_SHARD_ID;
      options.names = shardName;
      options.useHttp = true;
      options.host = 'http://status.leagueoflegends.com';

      util.exec(options, callback);
    },

    getAll: function (options, callback) {
      if (arguments.length === 1 && typeof options === 'function') {
        callback = arguments[0];
        options = null;
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATUS_SHARD_LIST;
      options.useHttp = true;
      options.host = 'http://status.leagueoflegends.com';

      util.exec(options, callback);
    }
  };

};
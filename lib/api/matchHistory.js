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
      options.uri = config.uri.MATCH_HISTORY;
      options.id = summonerId;
      options.query = {
        championIds: options.championIds instanceof Array ? options.championIds.join() : options.championIds || null,
        rankedQueues: options.rankedQueues instanceof Array ? options.rankedQueues.join() : options.rankedQueues || null,
        beginIndex: options.beginIndex || null,
        endIndex: options.endIndex || null
      };

      util.exec(options, callback);
    }
  };

};
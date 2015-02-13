module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  var getPlatformId = function (region) {
    switch (region) {
      case 'br':
        return 'BR1';
      case 'na':
        return 'NA1';
      case 'lan':
        return 'LA1';
      case 'las':
        return 'LA2';
      case 'oce':
        return 'OC1';
      case 'eune':
        return 'EUN1';
      case 'euw':
        return 'EUW1';
      case 'tr':
        return 'TR1';
      case 'ru':
        return 'RU';
      case 'kr':
        return 'KR';
      default:
        throw 'Your region is incorrect';
    }
  }

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
      options.platformId = getPlatformId(options.region);
      options.host = 'https://' + options.region + '.api.pvp.net';

      util.exec(options, callback);
    }
  };

};
var https = require('https');
var config = require('./config');
var RateLimiter = require('./rateLimiter');

module.exports = (function () {
  'use strict';

  var _apiKey = null;
  var _limiterPer10s;
  var _limiterPer10min;

  var util = {};

  util.isInteger = function (value) {
    return +value === (value|0);
  };

  util.isArrayOfIntegers = function (array) {
    if (!array instanceof Array || array.length === 0) return false;
    array.forEach(function (value) {
      if (!util.isInteger(value)) return false;
    });
    return true;
  };

  util.setApiKey = function (apiKey) {
    if (!apiKey || typeof apiKey !== 'string') {
      throw new Error('Invalid API key: ' + apiKey);
    }

    _apiKey = apiKey;
  };

  util.setDefaultRateLimit = function () {
    var limitPer10s = config.defaultLimitPer10s;
    var limitPer10min = config.defaultLimitPer10min;

    _limiterPer10s = new RateLimiter(limitPer10s, 10 * 1000, false);
    _limiterPer10min = new RateLimiter(limitPer10min, 10 * 60 * 1000, false);
  };

  util.setRateLimit = function (limitPer10s, limitPer10min) {
    if (!limitPer10s || !isInteger(limitPer10s)) {
      throw new Error('Invalid limit per 10 seconds: ' + limitPer10s);
    }
    if (!limitPer10min || !isInteger(limitPer10min)) {
      throw new Error('Invalid limit per 10 minutes: ' + limitPer10min);
    }

    _limiterPer10s = new RateLimiter(limitPer10s, 10 * 1000, false);
    _limiterPer10min = new RateLimiter(limitPer10min, 10 * 60 * 1000, false);
  };

  util.exec = function (options, callback) {
    try {
      options.uri = util.craftUri(options);
      util.request(options, callback);
    } catch (error) {
      callback(error, null);
    }
  };

  util.fillUri = function (options) {
    var params = options.uri.match(/\{(\w+)\}/gi);
    for (var i = 0; i < params.length; i++) {
      var param = params[i].slice(1, params[i].length - 1);
      if (!options[param]) {
        throw new Error('Param ' + param + ' was not provided');
      }
      options.uri = options.uri.replace(params[i], options[param]);
    }

    return options.uri;
  };

  util.craftUri = function (options) {
    if (!options) {
      throw new Error('Options missing');
    }
    if (!options.region || typeof options.region !== 'string') {
      throw new Error('Invalid region: ' + options.region);
    }
    if (!options.uri || typeof options.uri !== 'string') {
      throw new Error('Invalid API URI: ' + options.uri);
    }

    var host = 'https://' + (options.static ? 'global' : options.region) + '.' + config.endpoint;
    var uri = host + util.fillUri(options) + '?api_key=' + _apiKey;
    for (var param in options.query) {
      if (options.query[param] != null) {
        uri += '&' + param + '=' + options.query[param];
      }
    }
    // var query = '?api_key=' + _apiKey + (options.query ? '&' + options.query : '');

    return uri;
  };

  util.request = function (options, callback) {
    if (!options.uri || typeof options.uri !== 'string') {
      throw new Error('Invalid URI: ' + options.uri);
    }
    if (!callback || typeof callback !== 'function') {
      throw new Error('Invalid callback: ' + callback);
    }

    if (options.static) {
      util._get(options.uri, callback);
    } else {
      _limiterPer10s.schedule(function () {
          _limiterPer10min.schedule(function () {
            util._get(options.uri, callback);
          });
      });
    }
  };

  util._get = function (uri, callback) {
    var data = '';

    https.get(uri, function (response) {
      response.on('data', function (chunk) {
        data += chunk;
      });

      response.on('error', function (error) {
        callback(error, null);
      });

      response.on('end', function () {
        try {
          data = JSON.parse(data);
        } catch (error) {
          callback('Unable to parse data received from the server');
          return;
        }

        if (data.status && data.status.message !== 200) {
            callback(data.status.status_code + ' ' + data.status.message, null);
        } else {
            callback(null, data);
        }
      });
    });
  };

  return util;

})();
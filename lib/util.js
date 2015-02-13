var http = require('http');
var https = require('https');
var config = require('./config');
var RateLimiter = require('./rateLimiter');
var redis = require('redis');

module.exports = (function () {
  'use strict';

  var _apiKey = null;
  var _limiterPer10s;
  var _limiterPer10min;
  var _useRedis = false;
  var _cacheTTL = config.defaultTTL;

  var util = {};

  util.isInteger = function (value) {
    return +value === (value|0);
  };

  util.enableRedis = function (port, host, options) {
    if (!_useRedis && redis.createClient) {
      if (port && host) {
        options = options || {};
        redis = redis.createClient.apply(this, arguments);
      } else {
        redis = redis.createClient();
      }
      _useRedis = true;
    }
  };

  util.setCacheTTL = function (timeout) {
    _cacheTTL = timeout;
  };

  util.isArrayOfIntegers = function (array) {
    if (!(array instanceof Array) || array.length === 0) return false;
    array.forEach(function (value) {
      if (!util.isInteger(value)) return false;
    });
    return true;
  };

  util.isArrayOfStrings = function (array) {
    if (!(array instanceof Array) || array.length === 0) return false;
    array.forEach(function (value) {
      if (typeof value !== 'string') return false;
    });
    return true;
  }

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
    if (!limitPer10s || !util.isInteger(limitPer10s)) {
      throw new Error('Invalid limit per 10 seconds: ' + limitPer10s);
    }
    if (!limitPer10min || !util.isInteger(limitPer10min)) {
      throw new Error('Invalid limit per 10 minutes: ' + limitPer10min);
    }

    _limiterPer10s = new RateLimiter(limitPer10s, 10 * 1000, false);
    _limiterPer10min = new RateLimiter(limitPer10min, 10 * 60 * 1000, false);
  };

  util.exec = function (options, callback) {
    try {
      options.uri = util.craftUri(options);
    } catch (error) {
      callback(error, null);
      return;
    }

    util.request(options, callback);
  };

  util.fillUri = function (options) {
    var pattern = new RegExp('\\{(?:(\\w+):)?(\\w+)\\}', 'gi');
    var result = pattern.exec(options.uri);
    while (result) {
      var needle = result[0];
      var param = result[result.length - 1];

      if (!options[param]) {
        throw new Error('Param ' + param + ' was not provided');
      }
      if (result.length === 3) {
        var type = result[1];
        switch (type) {
          case 'string':
            if (typeof options[param] !== 'string' && !util.isArrayOfStrings(options[param])) {
              throw new Error('Param ' + param + ' must be string or an array of strings');
            }
            break;
          case 'int':
            if (!util.isInteger(options[param]) && !util.isArrayOfIntegers(options[param])) {
              throw new Error('Param ' + param + ' must be an integer or an array of integers');
            }
            break;
        }
        if (options[param] instanceof Array) {
          options[param] = options[param].join();
        }
      }
      result = pattern.exec(options.uri);
      options.uri = options.uri.replace(needle, options[param]);
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

    var host = options.host || 'https://' + (options.static ? 'global' : options.region) + '.' + config.endpoint;
    var uri = host + util.fillUri(options) + '?api_key=' + _apiKey;
    for (var param in options.query) {
      if (options.query[param] != null) {
        uri += '&' + param + '=' + options.query[param];
      }
    }

    return uri;
  };

  util.request = function (options, callback) {
    if (!options.uri || typeof options.uri !== 'string') {
      throw new Error('Invalid URI: ' + options.uri);
    }
    if (!callback || typeof callback !== 'function') {
      throw new Error('Invalid callback: ' + callback);
    }

    if (_useRedis) {
      redis.get(options.uri, function (error, results) {
        if (!error && results) {
          try {
            var obj = JSON.parse(results);
            callback(null, obj);
            return;
          } catch (err) {
            redis.del(options.uri);
          }
        }
        if (options.static) {
          util._get(options, callback);
        } else {
          util.schedule(function () {
            util._get(options, callback);
          });
        }
      });
    } else {
      if (options.static) {
        util._get(options, callback);
      } else {
        util.schedule(function () {
          util._get(options, callback);
        });
      }
    }

  };

  util.schedule = function (fn, callback) {
    _limiterPer10s.schedule(function () {
        _limiterPer10min.schedule(fn);
    });
  }

  util._get = function (options, callback) {
    var data = '';
    var protocol = options.useHttp ? http : https;

    protocol.get(options.uri, function (response) {
      var contentType = response.headers['content-type'];

      response.on('data', function (chunk) {
        data += chunk;
      });

      response.on('error', function (error) {
        callback(error, null);
      });

      response.on('end', function () {
        if (contentType.indexOf('application/json') === -1) {
          callback(response.statusCode + ' API failed to return JSON content', null);
          return;
        }

        if (!data) {
          callback(null, null);
          return;
        }

        try {
          data = JSON.parse(data);
        } catch (error) {
          callback('Unable to parse data received from the server', null);
          return;
        }

        if (data.status && data.status.message !== 200) {
          callback(data.status.status_code + ' ' + data.status.message, null);
        } else {
          if (_useRedis || options.cacheRequest) {
            redis.set(options.uri, JSON.stringify(data));
            redis.expire(options.uri, _cacheTTL);
          }

          callback(null, data);
        }
      });
    });
  };

  return util;

})();
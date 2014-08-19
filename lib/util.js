module.exports = function (apiKey) {
  'use strict';

  var https = require('https');
  var config = require('./config');

  var util = {};

  util.isInteger = function (value) {
    return value === +value && value === (value|0);
  }

  util.craftUri = function (options) {
    if (!options) {
      throw new Error('Options missing');
    }
    if (!options.region || typeof options.region !== 'string') {
      throw new Error('Invalid region: ' + options.region);
    }
    if (!config.endpoint || typeof config.endpoint !== 'string') {
      throw new Error('Invalid endpoint: ' + config.endpoint);
    }
    if (!options.uri || typeof options.uri !== 'string') {
      throw new Error('Invalid API URI: ' + options.uri);
    }

    var query = '?' + (options.query ? options.query + '&' : '') + 'api_key=' + apiKey;

    return 'https://' + options.region + '.' + config.endpoint + '/' +
      options.region + options.uri + query;
  }

  util.request = function (uri, callback) {
    if (!uri || typeof uri !== 'string') {
      throw new Error('Invalid URI: ' + uri);
    }
    if (!callback || typeof callback !== 'function') {
      throw new Error('Invalid callback: ' + callback);
    }

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
  }

  return util;

};
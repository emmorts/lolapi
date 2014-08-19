module.exports = function (apiKey) {
  'use strict';

  var config = require('./config');
  var util = require('./util')(apiKey);

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('Invalid API key: ' + apiKey);
  }

  var api = {};
  api.Champion = {};

  api.Champion.get = function (id, options, callback) {
    if (!id || !util.isInteger(id)) {
      throw new Error('ID should be an integer. Got: '+ id);
    }

    options = options || {};
    options.region = options.region || config.defaultRegion;
    options.uri = config.uri.champion + '/' + id;

    var uri = util.craftUri(options);

    util.request(uri, callback);
  }

  api.Champion.getAll = function (options, callback) {
    options = options || {};
    options.region = options.region || config.defaultRegion;
    options.uri = config.uri.champion;
    options.query = options.freeToPlay ? 'freeToPlay=true' : null;

    var uri = util.craftUri(options);

    util.request(uri, callback);
  }

  return api;

};
var config = require('./config');
var api = require('../lib/lolapi')(config.apiKey, 'euw');

module.exports = api;
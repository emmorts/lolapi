module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    getBySummonerId: function (summonerId, options, callback) {
      if (!summonerId || !(util.isInteger(summonerId) || util.isArrayOfIntegers(summonerId))) {
        throw new Error('ID should be an integer or array of integers. Got: '+ summonerId);
      }
      if (summonerId instanceof Array) {
        summonerId = summonerId.join();
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.LEAGUE_BY_SUMMONER_FULL;
      options.id = summonerId;

      util.exec(options, callback);
    },

    getEntriesBySummonerId: function (summonerId, options, callback) {
      if (!summonerId || !(util.isInteger(summonerId) || util.isArrayOfIntegers(summonerId))) {
        throw new Error('ID should be an integer or array of integers. Got: '+ summonerId);
      }
      if (summonerId instanceof Array) {
        summonerId = summonerId.join();
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.LEAGUE_BY_SUMMONER;
      options.id = summonerId;

      util.exec(options, callback);
    },

    getByTeamId: function (teamId, options, callback) {
      if (!teamId || !(util.isInteger(teamId) || util.isArrayOfIntegers(teamId))) {
        throw new Error('ID should be an integer or array of integers. Got: '+ teamId);
      }
      if (teamId instanceof Array) {
        teamId = teamId.join();
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.LEAGUE_BY_TEAM_FULL;
      options.id = teamId;

      util.exec(options, callback);
    },

    getEntriesByTeamId: function (teamId, options, callback) {
      if (!teamId || !(util.isInteger(teamId) || util.isArrayOfIntegers(teamId))) {
        throw new Error('ID should be an integer or array of integers. Got: '+ teamId);
      }
      if (teamId instanceof Array) {
        teamId = teamId.join();
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.LEAGUE_BY_TEAM;
      options.id = teamId;

      util.exec(options, callback);
    },

      getChallenger: function (type, options, callback) {
      if (!type || typeof type !== 'string') {
        throw new Error('Invalid challenger league type: ' + type);
      }

      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.CHALLENGER_LEAGUE;
      options.query = {
        type: type || 'RANKED_SOLO_5x5'
      };

      util.exec(options, callback);
    }
  };

};
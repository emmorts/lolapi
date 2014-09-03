module.exports = function (region) {
  'use strict';

  var config = require('../config');
  var util = require('../util');

  return {
    getChampions: function (options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_CHAMPION;
      options.static = true;

      util.exec(options, callback);
    },

  getChampion: function (championId, options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_CHAMPION_ID;
      options.id = championId;
      options.static = true;

      util.exec(options, callback);
    },

    getItems: function (options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_ITEM;
      options.static = true;

      util.exec(options, callback);
    },

  getItem: function (itemId, options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_ITEM_ID;
      options.id = itemId;
      options.static = true;

      util.exec(options, callback);
    },

    getMasteries: function (options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_MASTERY;
      options.static = true;

      util.exec(options, callback);
    },

  getMastery: function (masteryId, options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_MASTERY_ID;
      options.id = masteryId;
      options.static = true;

      util.exec(options, callback);
    },

    getRunes: function (options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_RUNE;
      options.static = true;

      util.exec(options, callback);
    },

  getRune: function (runeId, options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_RUNE_ID;
      options.id = runeId;
      options.static = true;

      util.exec(options, callback);
    },

    getSummonerSpells: function (options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_SUMMONER_SPELL;
      options.static = true;

      util.exec(options, callback);
    },

  getSummonerSpell: function (summonerSpellId, options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_SUMMONER_SPELL_ID;
      options.id = summonerSpellId;
      options.static = true;

      util.exec(options, callback);
    },

    getRealm: function (options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_REALM;
      options.static = true;

      util.exec(options, callback);
    },

    getVersions: function (options, callback) {
      options = options || {};
      options.region = options.region || region || config.defaultRegion;
      options.uri = config.uri.STATIC_VERSIONS;
      options.static = true;

      util.exec(options, callback);
    }
  };

};
module.exports = {
  defaultRegion: 'euw',
  defaultLimitPer10s: 10,
  defaultLimitPer10min: 500,
  defaultTTL: 3600,
  endpoint: 'api.pvp.net/api/lol',
  platforms: {
    br: 'BR1',
    na: 'NA1',
    lan: 'LA1',
    las: 'LA2',
    oce: 'OC1',
    eune: 'EUN1',
    euw: 'EUW1',
    tr: 'TR1',
    ru: 'RU',
    kr: 'KR'
  },
  uri: {
    // API Challenge
    API_CHALLENGE: '/{string:region}/v4.1/game/ids',
    // Champion
    CHAMPION_LIST: '/{string:region}/v1.2/champion',
    CHAMPION_ID: '/{string:region}/v1.2/champion/{int:id}',
    // Current Game
    CURRENT_GAME: '/observer-mode/rest/consumer/getSpectatorGameInfo/{string:platformId}/{int:id}',
    // Feature Games
    FEATURED_GAMES: '/observer-mode/rest/featured',
    // Game
    RECENT_GAMES: '/{string:region}/v1.3/game/by-summoner/{int:id}/recent',
    // League
    LEAGUE_BY_SUMMONER_FULL: '/{string:region}/v2.5/league/by-summoner/{int:id}',
    LEAGUE_BY_SUMMONER: '/{string:region}/v2.5/league/by-summoner/{int:id}/entry',
    LEAGUE_BY_TEAM_FULL: '/{string:region}/v2.5/league/by-team/{int:id}',
    LEAGUE_BY_TEAM: '/{string:region}/v2.5/league/by-team/{int:id}/entry',
    CHALLENGER_LEAGUE: '/{string:region}/v2.5/league/challenger',
    // Match
    MATCH: '/{string:region}/v2.2/match/{int:id}',
    // Match history
    MATCH_HISTORY: '/{string:region}/v2.2/matchhistory/{int:id}',
    // Summoner
    SUMMONER_BY_NAME: '/{string:region}/v1.4/summoner/by-name/{string:names}',
    SUMMONER_ID: '/{string:region}/v1.4/summoner/{int:id}',
    SUMMONER_NAME: '/{string:region}/v1.4/summoner/{int:id}/name',
    SUMMONER_RUNES: '/{string:region}/v1.4/summoner/{int:id}/runes',
    SUMMONER_MASTERIES: '/{string:region}/v1.4/summoner/{int:id}/masteries',
    // Stats
    RANKED_STATS: '/{string:region}/v1.3/stats/by-summoner/{int:id}/ranked',
    STAT_SUMMARY: '/{string:region}/v1.3/stats/by-summoner/{int:id}/summary',
    // Static
    STATIC_CHAMPION: '/static-data/{string:region}/v1.2/champion',
    STATIC_CHAMPION_ID: '/static-data/{string:region}/v1.2/champion/{int:id}',
    STATIC_ITEM: '/static-data/{string:region}/v1.2/item',
    STATIC_ITEM_ID: '/static-data/{string:region}/v1.2/item/{int:id}',
    STATIC_MASTERY: '/static-data/{string:region}/v1.2/mastery',
    STATIC_MASTERY_ID: '/static-data/{string:region}/v1.2/mastery/{int:id}',
    STATIC_REALM: '/static-data/{string:region}/v1.2/realm',
    STATIC_VERSIONS: '/static-data/{string:region}/v1.2/versions',
    STATIC_RUNE: '/static-data/{string:region}/v1.2/rune',
    STATIC_RUNE_ID: '/static-data/{string:region}/v1.2/rune/{int:id}',
    STATIC_SUMMONER_SPELL: '/static-data/{string:region}/v1.2/summoner-spell',
    STATIC_SUMMONER_SPELL_ID: '/static-data/{string:region}/v1.2/summoner-spell/{int:id}',
    // Status
    STATUS_SHARD_LIST: '/shards',
    STATUS_SHARD_ID: '/shards/{string:names}',
    // Team
    TEAM_BY_SUMMONER: '/{string:region}/v2.4/team/by-summoner/{int:id}',
    TEAM_ID: '/{string:region}/v2.4/team/{string:id}'
  }
}
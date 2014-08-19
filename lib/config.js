module.exports = {
  defaultRegion: 'euw',
  endpoint: 'api.pvp.net/api/lol',
  staticUri: '/static-data',
  uri: {
    champion: '/v1.2/champion',
    game: '/v1.3/game',
    league: '/v2.4/league',
    match: '/v2.2/match',
    matchHistory: '/v2.2/matchhistory',
    stats: '/v1.3/stats',
    summoner: '/v1.4/summoner',
    team: '/v2.3/team',
    static: {
      item: '/v1.2/item',
      mastery: '/v1.2/mastery',
      realm: '/v1.2/realm',
      rune: '/v1.2/rune',
      summonerSpell: '/v1.2/summoner-spell',
      version: '/v1.2/versions'
    }
  }
}
lolapi
======

Wrapper of the official League of Legends public API with cache support.

[![Build Status](https://travis-ci.org/emmorts/lolapi.svg?branch=master)](https://travis-ci.org/emmorts/lolapi)

Installation
-----------
Install this package by running `npm install lolapi`.

Quick Start
-----------
```Javascript
var lolapi = require('lolapi')('my-api-key', 'euw');

lolapi.setRateLimit(10, 500);

var summonerName = 'wickd';
lolapi.Summoner.getByName(summonerName, function (error, summoner) {
  if (error) throw error;
  /* summoner object
  { wickd:
    {
      id: 71500,
      name: 'Wickd',
      profileIconId: 613,
      summonerLevel: 30,
      revisionDate: 1408199475000
    }
  } */
  var summonerId = summoner[summonerName].id;
  lolapi.Summoner.getRunes(summonerId, function (error, runes) {
    if (error) throw error;
    // do something with runes
  })
});
```

API
---
API callbacks follow default Node.JS pattern returning error object as the first argument and result as the second one.

Every API call has an optional argument `options` with following available properties:
- **region** may be added in order to define the region; if it's not set, region from the constructor will be used; if that is not defined either, region will default to *Europe West*
- **cacheRequest** a flag indicating if specific request should be cached(note that you must have redis server running in order for this to work)

Most of the API calls have additional available properties covered below.

- [Constructor(apiKey[, region, options])](#constructorapikey-region-options)
- [setRateLimit(limitPer10s, limitPer10min)](#setratelimitlimitper10s-limitper10min)
- [Champion.get(championId, [options, ]callback)](#championgetchampionid-options-callback)
- [Champion.getAll([options, ]callback)](#championgetalloptions-callback)
- [Game.getBySummonerId(summonerId, [options, ]callback)](#gamegetbysummoneridsummonerid-options-callback)
- [League.getBySummonerId(summonerIds, [options, ]callback)](#leaguegetbysummoneridsummonerids-options-callback)
- [League.getEntriesBySummonerId(summonerIds, [options, ]callback)](#leaguegetentriesbysummoneridsummonerids-options-callback)
- [League.getByTeamId(teamIds, [options, ]callback)](#leaguegetbyteamidteamids-options-callback)
- [League.getEntriesByTeamId(teamIds, [options, ]callback)](#leaguegetentriesbyteamidteamids-options-callback)
- [League.getChallenger(type, [options, ]callback)](#leaguegetchallengertype-options-callback)
- [Match.get(matchId, [options, ]callback)](#matchgetmatchid-options-callback)
- [MatchHistory.getBySummonerId(summonerIds, [options, ]callback)](#matchhistorygetbysummoneridsummonerids-options-callback)
- [Static.getChampions([options, ]callback)](#staticgetchampionsoptions-callback)
- [Static.getChampion(championId, [options, ]callback)](#staticgetchampionchampionid-options-callback)
- [Static.getItems([options, ]callback)](#staticgetitemsoptions-callback)
- [Static.getItem(itemId, [options, ]callback)](#staticgetitemitemid-options-callback)
- [Static.getMasteries([options, ]callback)](#staticgetmasteriesoptions-callback)
- [Static.getMastery(masteryId, [options, ]callback)](#staticgetmasterymasteryid-options-callback)
- [Static.getRunes([options, ]callback)](#staticgetrunesoptions-callback)
- [Static.getRune(runeId, [options, ]callback)](#staticgetruneruneid-options-callback)
- [Static.getSummonerSpells([options, ]callback)](#staticgetsummonerspellsoptions-callback)
- [Static.getSummonerSpell(summonerSpellId, [options, ]callback)](#staticgetsummonerspellsummonerspellid-options-callback)
- [Static.getRealm([options, ]callback)](#staticgetrealmoptions-callback)
- [Static.getVersions([options, ]callback)](#staticgetversionsoptions-callback)
- [Stats.getRanked([options, ]callback)](#statsgetrankedoptions-callback)
- [Stats.getSummary([options, ]callback)](#statsgetsummaryoptions-callback)
- [Summoner.get(summonerIds, [options, ]callback)](#summonergetsummonerids-options-callback)
- [Summoner.getByName(summonerNames, [options, ]callback)](#summonergetbynamesummonernames-options-callback)
- [Summoner.getName(summonerIds, [options, ]callback)](#summonergetnamesummonerids-options-callback)
- [Summoner.getRunes(summonerIds, [options, ]callback)](#summonergetrunessummonerids-options-callback)
- [Summoner.getMasteries(summonerIds, [options, ]callback)](#summonergetmasteriessummonerids-options-callback)
- [Team.get(teamId, [options, ]callback)](#teamgetteamid-options-callback)
- [Team.getBySummonerId(summonerId, [options, ]callback)](#teamgetbysummoneridsummonerid-options-callback)


### Constructor(apiKey[, region, options])
Constructor of the main singleton.

Additional `options` properties:
- **useRedis** - a flag indicating if Redis cache database should be used(false by default). Please note, that in order to use cache, you must have redis server running on your computer
- **port** - port Redis server is running on(if unspecified, default 6379 will be used)
- **hostname** - hostname Redis server is running on(if unspecified, default 127.0.0.1 will be used)
- **cacheTTL** - sets a timeout on cached data in seconds(an hour by default)

Simple initialization:
```Javascript
var lolapi = require('lolapi')('my-api-key');
// ready to go!
```

A more advanced example:
```Javascript
var options = {
  useRedis: true,
  hostname: '127.0.0.1',
  port: 6379,
  cacheTTL: 7200
};
var lolapi = require('lolapi')('my-api-key', 'euw', options);
// all requests are now being cached with a timeout of 2 hours
var summonerName = 'wickd';
lolapi.Summoner.getByName(summonerName, function () {
  // will take 500ms~
});
lolapi.Summoner.getByName(summonerName, function () {
  // will now take 1-5 ms
});
```

#### setRateLimit(limitPer10s, limitPer10min)
Sets a request limit. When either limit is reached, subsequent requests will be queued and ran when possible.

#### Champion.get(championId, [options, ]callback)
Retrieves a champion by its ID.

#### Champion.getAll([options, ]callback)
Retrieves all champions.

Additional `options` properties:
- **freeToPlay** - if true, will only return champions that are free to play

Example:
```Javascript
lolapi.Champion.getAll({ freeToPlay: true }, function (error, champion) {
  // do something with free to play champions
});
```
#### Game.getBySummonerId(summonerId, [options, ]callback)
Get recent games by summoner ID.

#### League.getBySummonerId(summonerIds, [options, ]callback)
Get leagues by summoner ID or array of summoner IDs.

#### League.getEntriesBySummonerId(summonerIds, [options, ]callback)
Get league entries by summoner ID or array of summoner IDs.

#### League.getByTeamId(teamIds, [options, ]callback)
Get leagues by team ID or array of team IDs.

#### League.getEntriesByTeamId(teamIds, [options, ]callback)
Get league entries by team ID or array of team IDs.

#### League.getChallenger(type, [options, ]callback)
Get challenger tier leagues.

Property `type` may contain one of the following values:
- RANKED_SOLO_5X5
- RANKED_TEAM_3X3
- RANKED_TEAM_5X5

#### Match.get(matchId, [options, ]callback)
Get match by match ID.

Additional `options` properties:
- **includeTimeline** - if true, will include timeline of the match in the results

#### MatchHistory.getBySummonerId(summonerIds, [options, ]callback)
Get match history by summoner ID or array of summoner IDs.

Additional `options` properties:
- **championIds** - array of champion IDs you want to see in resulting matches
- **rankedQueues** - array of ranked queues you want to see the results of
- **beginIndex**
- **endIndex**

Example:
```Javascript
var options = {
  championIds: 412,
  rankedQueues: ['RANKED_SOLO_5X5', 'RANKED_TEAM_5X5'],
  beginIndex: 0,
  endIndex: 10
}; // these options will return 10 ranked 5v5 games containing champion Thresh
lolapi.MatchHistory.getBySummonerId(71500, options, function (error, matches) {
  // got the matches!
});
```

#### Static.getChampions([options, ]callback)
Get list of champions.

Additional `options` properties:
- **locale** - locale code for returned data (e.g., en_US, es_ES)
- **version** - data dragon version for returned data
- **dataById** - if true, the returned data map will use the champions' IDs as the keys
- **champData** - tags to return additional data. Available tags: *all*, *allytips*, *altimages*, *blurb*, *enemytips*, *image*, *info*, *lore*, *partype*, *passive*, *recommended*, *skins*, *spells*, *stats*, *tags*

#### Static.getChampion(championId, [options, ]callback)
Get champion by ID.

Additional `options` properties:
- **locale** - locale code for returned data (e.g., en_US, es_ES)
- **version** - data dragon version for returned data
- **champData** - tags to return additional data. Available tags: *all*, *allytips*, *altimages*, *blurb*, *enemytips*, *image*, *info*, *lore*, *partype*, *passive*, *recommended*, *skins*, *spells*, *stats*, *tags*

#### Static.getItems([options, ]callback)
Get list of items.

Additional `options` properties:
- **locale** - locale code for returned data (e.g., en_US, es_ES)
- **version** - data dragon version for returned data
- **itemListData** - tags to return additional data. Available tags: *all*, *colloq*, *consumeOnFull*, *consumed*, *depth*, *from*, *gold*, *groups*, *hideFromAll*, *image*, *inStore*, *into*, *maps*, *requiredChampion*, *sanitizedDescription*, *specialRecipe*, *stacks*, *stats*, *tags*, *tree*

#### Static.getItem(itemId, [options, ]callback)
Get item by ID.

Additional `options` properties:
- **locale** - locale code for returned data (e.g., en_US, es_ES)
- **version** - data dragon version for returned data
- **itemData** - tags to return additional data. Available tags: *all*, *colloq*, *consumeOnFull*, *consumed*, *depth*, *from*, *gold*, *hideFromAll*, *image*, *inStore*, *into*, *maps*, *requiredChampion*, *sanitizedDescription*, *specialRecipe*, *stacks*, *stats*, *tags*

#### Static.getMasteries([options, ]callback)
Get list of masteries.

Additional `options` properties:
- **locale** - locale code for returned data (e.g., en_US, es_ES)
- **version** - data dragon version for returned data
- **masteryListData** - tags to return additional data. Available tags: *all*, *image*, *prereq*, *ranks*, *sanitizedDescription*, *tree*

#### Static.getMastery(masteryId, [options, ]callback)
Get mastery by ID.

Additional `options` properties:
- **locale** - locale code for returned data (e.g., en_US, es_ES)
- **version** - data dragon version for returned data
- **masteryListData** - tags to return additional data. Available tags: *all*, *image*, *prereq*, *ranks*, *sanitizedDescription*

#### Static.getRunes([options, ]callback)
Get list of runes.

Additional `options` properties:
- **locale** - locale code for returned data (e.g., en_US, es_ES)
- **version** - data dragon version for returned data
- **runeListData** - tags to return additional data. Available tags: *all*, *basic*, *colloq*, *consumeOnFull*, *consumed*, *depth*, *from*, *gold*, *hideFromAll*, *image*, *inStore*, *into*, *maps*, *requiredChampion*, *sanitizedDescription*, *specialRecipe*, *stacks*, *stats*, *tags*

#### Static.getRune(runeId, [options, ]callback)
Get rune by ID.

Additional `options` properties:
- **locale** - locale code for returned data (e.g., en_US, es_ES)
- **version** - data dragon version for returned data
- **runeData** - tags to return additional data. Available tags: *all*, *colloq*, *consumeOnFull*, *consumed*, *depth*, *from*, *gold*, *hideFromAll*, *image*, *inStore*, *into*, *maps*, *requiredChampion*, *sanitizedDescription*, *specialRecipe*, *stacks*, *stats*, *tags*

#### Static.getSummonerSpells([options, ]callback)
Get list of summoner spells.

Additional `options` properties:
- **locale** - locale code for returned data (e.g., en_US, es_ES)
- **version** - data dragon version for returned data
- **dataById** - if true, the returned data map will use the spells' IDs as the keys
- **spellData** - tags to return additional data. Available tags: *all*, *cooldown*, *cooldownBurn*, *cost*, *costBurn*, *costType*, *effect*, *effectBurn*, *image*, *key*, *leveltip*, *maxrank*, *modes*, *range*, *rangeBurn*, *resource*, *sanitizedDescription*, *sanitizedTooltip*, *tooltip*, *vars*

#### Static.getSummonerSpell(summonerSpellId, [options, ]callback)
Get summoner spell by ID.

Additional `options` properties:
- **locale** - locale code for returned data (e.g., en_US, es_ES)
- **version** - data dragon version for returned data
- **spellData** - tags to return additional data. Available tags: *all*, *cooldown*, *cooldownBurn*, *cost*, *costBurn*, *costType*, *effect*, *effectBurn*, *image*, *key*, *leveltip*, *maxrank*, *modes*, *range*, *rangeBurn*, *resource*, *sanitizedDescription*, *sanitizedTooltip*, *tooltip*, *vars*

#### Static.getRealm([options, ]callback)
Get realm data.

#### Static.getVersions([options, ]callback)
Get versions data.

#### Stats.getRanked([options, ]callback)
Get ranked stats by summoner ID.

Additional `options` properties:
- **season** - name of the season you want to retrieve stats of(eg. *SEASON3* or *SEASON4*)

#### Stats.getSummary([options, ]callback)
Get player stats summaries by summoner ID.

Additional `options` properties:
- **season** - name of the season you want to retrieve stats of(eg. *SEASON3* or *SEASON4*)

#### Status.get(region, [options, ]callback)
Get specific shard status by region.

#### Status.getAll([options, ]callback)
Get shard list.

#### Summoner.get(summonerIds, [options, ]callback)
Get summoner by ID or list of summoner IDs.

#### Summoner.getByName(summonerNames, [options, ]callback)
Get summoner by name or list of summoner names.

#### Summoner.getName(summonerIds, [options, ]callback)
Get summoner name by ID or list of summoner IDs.

#### Summoner.getRunes(summonerIds, [options, ]callback)
Get summoner runes by ID or list of summoner IDs.

#### Summoner.getMasteries(summonerIds, [options, ]callback)
Get summoner masteries by ID or list of summoner IDs.

#### Team.get(teamId, [options, ]callback)
Get team by ID.

#### Team.getBySummonerId(summonerId, [options, ]callback)
Get team by summoner ID.

var lolapi = require('lolapi')('my-api-key', 'euw');

var summonerName = 'wickd';
lolapi.Summoner.getByName(summonerName, function (error, summoner) {
  if (error) throw error;

  console.log(summoner);

  var summonerId = summoner[summonerName].id;
  lolapi.Summoner.getRunes(summonerId, function (error, runes) {
    if (error) throw error;

    console.log(runes);
  })
});
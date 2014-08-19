lolapi
======

Wrapper of the official League of Legends public API.


Installation
-----------
Install this package by running `npm install lolapi`.

Quick Start
-----------
```Javascript
var lolapi = require('lolapi')('my-api-key', 'euw');

lolapi.Game.getBySummonerId(71054, {}, function (error, results) {
  // do something
});
```

API
---
```Javascript
setRateLimit(limitPer10s, limitPer10min, allowBursts);

Champion.get(championId, options, callback);
Champion.getAll(options, callback);
Game.getBySummonerId(summonerId, options, callback);
```

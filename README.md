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
Every API call has an argument `options` which may be left `null` if desired. `options` property `region` may be used in every call to define the region; if it's left empty, region from the constructor will be used; if that is not defined either, region will default to `Europe West`. Most of the API have additional available properties covered below.

### setRateLimit(limitPer10s, limitPer10min)
Sets a request limit. When either limit is reached, the request will be queued and ran as soon as possible.

### Champion.get(championId, options, callback);
Gets a champion by its ID.

### Champion.getAll(options, callback);
Gets all champions.

`options` may contain `freeToPlay` attribute. If that is set to true, it will only return champions that are free to play.

Example:
```Javascript
Champion.getAll({ freeToPlay: true }, function (error, champion) {
  // do something with free to play champions
});
```

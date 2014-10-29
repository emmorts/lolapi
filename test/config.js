var apiKey = process.env.API_KEY || API_KEY;

if (apiKey) {
  throw new Error("Please set an API key in test/config.js before running tests.");
}

module.exports = {
  apiKey: apiKey
};
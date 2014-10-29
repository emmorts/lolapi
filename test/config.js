var apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("Please set an API key in test/config.js or an environment variable API_KEY before running tests.");
}

module.exports = {
  apiKey: apiKey
};
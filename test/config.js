if (!API_KEY) {
  throw new Error("Please set an API key in test/config.js before running tests.");
}

module.exports = {
  apiKey: API_KEY
};
const config = require('./config.json');

module.exports = {
    consumer_key: config.production.consumer_key,
    consumer_secret: config.production.consumer_secret,
    access_token_key: config.production.access_token_key,
    access_token_secret: config.production.access_token_secret
};
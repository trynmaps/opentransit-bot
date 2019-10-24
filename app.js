const Twitter = require('twitter');
const config = require('./config.js');
const client = new Twitter(config);

const summary = require('./messages/daily-summary');

client.post('statuses/update', {status: 
    summary.message
}).then(tweet => {
    console.log(tweet);
})
.catch(error => {
    throw error;
})
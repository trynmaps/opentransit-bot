
const Twitter = require('twitter');
const config = require('./config.js');
const client = new Twitter(config);

module.exports = {
    post: (message) => {
        client.post('statuses/update', {status: 
            message
        }).then(tweet => {
            console.log(tweet);
        })
        .catch(error => {
            throw error;
        })
    }
}

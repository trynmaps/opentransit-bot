const tweet = require('./tweet');
const daily_summary = require('./messages/daily-summary');

daily_summary.message().then((message) => {
    tweet.post(message);
});
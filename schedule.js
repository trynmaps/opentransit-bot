const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();
// const promisePool = require('es6-promise-pool');
// const PromisePool = promisePool.PromisePool;
// Maximum concurrent account deletions.
// const MAX_CONCURRENT = 3;

exports.PostDailySummary = functions.pubsub.schedule('every day 02:00').onRun(async context => {
    const tweet = require('./tweet');
    const daily_summary = require('./messages/daily-summary');

    daily_summary.message().then((message) => {
        tweet.post(message);
    });
});
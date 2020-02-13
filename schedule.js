const cron = require('node-cron');

cron.schedule('* * 12 * * *', () => {
    console.log('running a task every minute');
});
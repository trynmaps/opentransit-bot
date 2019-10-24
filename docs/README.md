# OpenTransit Twitter Bot

## How To Use

1. run `npm install`
2. Create File `./config.json`:
```json
{
    "production": {
        "consumer_key": "CONSUMER_KEY",
        "consumer_secret": "CONSUMER_SECRET",
        "access_token_key": "ACCESS_TOKEN_KEY",
        "access_token_secret": "ACCESS_TOKEN_SECRET"
    } 
}
```
3. Get consumer and access keys from a Team Lead and populate inside `./config.json`.
4. Run `node app.js`
5. Validate Twitter post on https://twitter.com/opentransit_bot

## Need To Do
1. GraphQL dynamic data pull
2. JS based cron library to automate posts
3. GCP setup for prod use
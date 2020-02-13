// const axios = require('axios');
const moment = require('moment');
const { createApolloFetch } = require('apollo-fetch');
const tweet = require("./../tweet");

const apolloFetch = createApolloFetch({
  uri: 'https://muni.opentransit.city/api/graphiql',
});

//TODO: make dates set at correct time zone so 1 day ago != 2 days ago
const variables1 = { date: [ moment().subtract(1, 'day').format("YYYY-MM-DD") ] };
const variables2 = { date: 
  [
    moment().subtract(2, 'day').format("YYYY-MM-DD"),
    moment().subtract(3, 'day').format("YYYY-MM-DD"),
    moment().subtract(4, 'day').format("YYYY-MM-DD"),
    moment().subtract(5, 'day').format("YYYY-MM-DD"),
    moment().subtract(6, 'day').format("YYYY-MM-DD"),
    moment().subtract(7, 'day').format("YYYY-MM-DD"),
    moment().subtract(8, 'day').format("YYYY-MM-DD"),
  ]
};

const query = `query($date:[String]!) {
  agency(agencyId: "muni") {
    interval(dates: $date) {
      routes {
        routeId
        directions {
          averageSpeed
        }
      }
    }
  }
}`;

let routeSpeed1 = {};
let routeSpeed2 = {};
const calcRoutesSpeed = (ref, data) => {
  return data.agency.interval.routes.forEach(route => { 
    if (route.directions) {
      let avgSpeed = 0;
      
      route.directions.forEach(dir => {
        if (dir.averageSpeed && dir.averageSpeed != null) {
          avgSpeed += dir.averageSpeed;
        }
      });

      ref[route.routeId] = {
        speed: avgSpeed,
        count: route.directions.length,
      };
    }
  }); 
};

apolloFetch({ query, variables: variables1 })
.then(({ data }) => {
  calcRoutesSpeed(routeSpeed1, data);
  checkIfFinished();
})
.catch(e => {
  console.log(e);
});

apolloFetch({ query, variables: variables2 })
.then(({ data }) => {
  calcRoutesSpeed(routeSpeed2, data);
  checkIfFinished();
})
.catch(e => {
  console.log(e);
});

function checkIfFinished() {
  if (Object.keys(routeSpeed1).length > 0 && Object.keys(routeSpeed2).length > 0) {
    let data = [];

    Object.keys(routeSpeed1).forEach(key => { 
      if (routeSpeed2[key] && routeSpeed2[key].speed > 0 && routeSpeed1[key].speed > 0) {
        data.push([key, ((routeSpeed1[key].speed - routeSpeed2[key].speed) / routeSpeed2[key].speed)*100, routeSpeed1[key].speed, routeSpeed2[key].speed]);
      }
    });

    data.sort((a,b) => b[1]-a[1]);

    let best = data.shift();
    let worst = data.pop();

    tweet.post(`Over the last week for San Francisco, route ${best[0]}'s average speed yesterday changed the best by ${Math.round(best[1]*100)/100}%, and route ${worst[0]}'s average speed yesterday changed the worst by ${Math.round(worst[1]*100)/100}% >> muni.opentransit.city`);
  }
}
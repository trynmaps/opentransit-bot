const moment = require('moment');
const { GraphQLClient } = require('graphql-request');

const graphQLClient = new GraphQLClient('https://muni.opentransit.city/api/graphiql');
// TODO: make dates set at correct time zone so 1 day ago != 2 days ago
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
const timeCompare1 = { date: [ moment().subtract(1, 'day').format("YYYY-MM-DD") ] };
const timeCompare2 = { date: 
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

async function fetchInfo(variables) {

  return await graphQLClient.request(query, variables).then(data => {
    const ref = {};
    data.agency.interval.routes.forEach(route => { 
      if (route.directions) {
        let avgSpeed = 0;
        
        route.directions.forEach(dir => {
          avgSpeed += (dir.averageSpeed && dir.averageSpeed != null) ? dir.averageSpeed : 0;
        });

        ref[route.routeId] = {
          speed: avgSpeed,
          count: route.directions.length,
        };
      }
    }); 
    return ref;
  });

}

module.exports = {
  message: async () => {
    const routeSpeed1 = await fetchInfo(timeCompare1);
    const routeSpeed2 = await fetchInfo(timeCompare2);
    const data = [];
  
    Object.keys(routeSpeed1).forEach(key => { 
      if (routeSpeed2[key] && routeSpeed2[key].speed > 0 && routeSpeed1[key].speed > 0) {
        data.push([
          key,
          ((routeSpeed1[key].speed - routeSpeed2[key].speed) / routeSpeed2[key].speed)*100,
          routeSpeed1[key].speed,
          routeSpeed2[key].speed
        ]);
      }
    });
  
    data.sort((a,b) => b[1]-a[1]);
    const best = data.shift();
    const worst = data.pop();
  
    return `Hey #SanFrancisco! Compared to last week, yesterday
Route #${best[0]} avg. speed increased the most by ${Math.round(best[1])}%
Route #${worst[0]} avg. speed decreased the most by ${Math.round(worst[1])}% 
Check us out >> muni.opentransit.city`;  
  }
};
const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
    uri: 'https://muni.opentransit.city/api/graphql',
});

let buses = 287;
let runs = 897;
let mins = 12847;
let yesterday = new Date().toDateString("m d, Y");

fetch({
    query: `query {
        routes {
            id
            title
        }
    }`,
    // variables: { id: 1 },
}).then(res => {
    console.log(res.data);
});

module.exports = {
    message: `OpenTransit tracked ${buses} buses performing ${runs} runs for a total of ${mins} mins on the road, ${yesterday} for #SF >> muni.opentransit.city`
}

const buses = 287;
const runs = 897;
const mins = 12847;
const yesterday = new Date().toDateString("m d, Y");

module.exports = {
    message: `OpenTransit tracked ${buses} buses performing ${runs} runs for a total of ${mins} mins on the road, ${yesterday} for #SF >> muni.opentransit.city`
}
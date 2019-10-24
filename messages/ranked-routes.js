const date = new Date().toDateString("M d, Y");
const totalRoutes = 70;
const bestRoute = {
    route: 14,
    waitRank: 2,
    waitTimeInMinutes: 20,
    speedAverageInMPH: 40,
    speedRank: 12
};
const worstRoute = {
    route: 28,
    waitRank: 70,
    waitTimeInMinutes: 20,
    speedAverageInMPH: 40,
    speedRank: 20
};

module.exports = { message: `#SFMUNI STATS FOR ${date}:\n
Best route was ${bestRoute.route} avg wait of ${bestRoute.waitTimeInMinutes} min (#${bestRoute.waitRank}/${totalRoutes} overall) 
and avg speed of ${bestRoute.speedAverageInMPH} MPH (#${bestRoute.speedRank}/${totalRoutes} overall).\n
The worst route was ${worstRoute.worstRoute} avg wait of ${worstRoute.waitTimeInMinutes} min (#${worstRoute.waitRank}/${totalRoutes} overall) 
and avg speed of ${worstRoute.speedAverageInMPH} MPH (#${worstRoute.speedRank}/${totalRoutes} overall).`
};
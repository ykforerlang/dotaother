/**
 * Created by yk on 2016/4/28.
 */

var Steam = require("steam")
var Dota2 = require("dota2")
var resources = require("../conf/resources.json")
var logOnDetails = resources.steamAccount[0]
console.log("logDetail :", logOnDetails)

var steamClient = new Steam.SteamClient()
var steamUser = new Steam.SteamUser(steamClient)
var dota2 = new Dota2.Dota2Client(steamClient, true) // true  : debug
console.log(dota2)

steamClient.connect()

// steam event
steamClient.on("connected", function() {
    console.log("steam connect success !")
    steamUser.logOn(logOnDetails);
})

steamClient.on('logOnResponse', function(res) {
    console.log("steam logonres:", res)

    if(res.eresult == 1)  {
        // 1 == ok
        console.log("login in ")
        dota2.launch()
        dota2.on("ready", dota2Ready)
    }

})
var dota2Ready = function() {
    console.log("dota2 client ready")


    dota2.requestLeagueInfo()
    dota2.on("leagueData", solveLeagueData)
}
var solveLeagueData = function(leagueData) {
    console.log("receive leagueData:",leagueData);
}



steamClient.on('loggedOff', function() {
    console.log("Logged off from Steam.");
})
steamClient.on('error', function() {
    console.log("Connection closed by server.")
})





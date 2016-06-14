/**
 * Created by yk on 2016/5/3.
 */
var dota2Web = require("./dota2Web")
var util=require('util');
var EventEmitter = require('events');
var resources = require("../conf/resources.json")


var Dota2Service = function Dota2Service() {

}
util.inherits(Dota2Service, EventEmitter)

Dota2Service.prototype.initLeaguesInfo = function(cb) {
    var thiz = this
    dota2Web.getLeagueListing({language:"zh"}, function(err, result) {
        if (err) {
            cb(err)
            return
        }
        var leagues = JSON.parse(result)
        var leaguesList = leagues.result.leagues
        console.log("total leagues:", leaguesList.length)

        thiz.emit("downloadPic", leaguesList, 0)
    })
}

Dota2Service.prototype.on("downloadPic", function(leaguesList, i) {
    var thiz = this

    if (i >= leaguesList.length) return
    var sub = leaguesList[i]
    console.log("download pic with league id : ", sub.leagueid)
    dota2Web.getLeagueIconBig(sub.leagueid, function(status, path){
        if (status ==1) {
            console.log("download big icon league: with path:", path)
            sub.bigIcon = resources.host + path
        }

        dota2Web.getLeagueIconSmall(sub.leagueid, function(status, path) {
            if (status == 1) {
                console.log("download big small league: with path:", path)
                sub.smallIcon = resources.host + path
            }
            thiz.emit("downloadPic", leaguesList, i + 1)
        })
    })

})

module.exports = new Dota2Service();
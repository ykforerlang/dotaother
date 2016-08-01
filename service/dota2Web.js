/**
 * Created by yk on 2016/4/28.
 */

var resources = require("../conf/resources.json")
var Dota2Api = require('dota2-api')
var request = require('request')
var fs = require("fs")

//http://api.steampowered.com/IEconItems_570/GetSchemaURL/v1/?key={}
Dota2Api.prototype.getSchemaInfo = function(cb) {
    this.validOptions = ['']
    this.path = 'IEconItems_' + this.ID + '/GetSchemaURL/v1';

    this._request({}, cb);

}

//https://api.steampowered.com/IEconDOTA2_570/GetItemIconPath/v1/?key=<>&format=json&iconname=subscriptions_sdl
Dota2Api.prototype.getItemIconPath = function(options, cb) {
    this.validOptions = ["iconname"]
    this.path = 'IEconDOTA2_' + this.ID + '/GetItemIconPath/v1';

    this._request(options, cb);
}

// http://riki.dotabuff.net/leagues/3454/full.png
Dota2Api.prototype.getLeagueIconBig = function(leagueId, cb) {
    var filePath = "../public/images/league/big/" + leagueId + ".png"
    fs.exists(filePath, function(exis) {
        if (! exis) {
            var stream = request("http://riki.dotabuff.net/leagues/" + leagueId + "/full.png")
            var fileStream = fs.createWriteStream(filePath)
            stream.pipe(fileStream)
            stream.on("end", function() {
                fileStream.close()
                cb(1, "/images/league/big/" + leagueId + ".png")
            })
        } else {
            cb(0)
        }
    })
}

Dota2Api.prototype.getLeagueIconSmall = function(leagueId, cb) {
    var filePath = "../public/images/league/small/" + leagueId + ".png"
    fs.exists(filePath, function(exis) {
        if (! exis) {
            var stream = request("http://riki.dotabuff.net/leagues/" + leagueId + "/banner.png")
            var fileStream = fs.createWriteStream(filePath)
            stream.pipe(fileStream)
            stream.on("end", function() {
                fileStream.close()
                cb(1, "/images/league/small/" + leagueId + ".png")
            })
        } else  {
            cb(0)
        }
    })
}

//https://api.steampowered.com/IEconDOTA2_570/GetTournamentPrizePool/v1?key=577A366039269967223A15C59EDE6D3B&leagueid=2733
Dota2Api.prototype.getLeaguePricePool = function(leagueId, cb) {
    this.validOptions = ["leagueid"]
    this.path = 'IEconDOTA2_' + this.ID + '/GetTournamentPrizePool/v1';
    this._request({leagueid:leagueId}, cb);
}


var da = Dota2Api.create(resources.webKey);

module.exports = da



/*
da.getSchemaInfo(function(err, res) {
    if (err) return err

    var resJson = JSON.parse(res)

    var url = resJson.result.items_game_url
    console.log("items game url:", url)

    var itemsGamePath= "../conf/itemsGame.json"
    var stream = request(url)
    stream.pipe(fs.createWriteStream(itemsGamePath))
    stream.on("end", function() {
        console.log("get url: end")


    })
})
*/

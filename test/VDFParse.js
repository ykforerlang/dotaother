/**
 * Created by yk on 2016/5/10.
 * parse value data format
 */

var kvn = require("keyvalues-node")
var fs = require("fs")
var dota2Web = require("../service/dota2Web")
var resources = require("../conf/resources.json")
var collections = resources.mongo.collectionName
var mongoService = require("../service/mongoService")


fs.readFile("../conf/itemsGame.txt", function(err, data) {
    var result = kvn.decode(data.toString())
    var items = result.items_game.items

    dota2Web.getLeagueListing({"language": "zh"}, function(err, data) {
        var webLeaList = JSON.parse(data)
        var leagues = webLeaList.result.leagues
        for (var key in leagues) {
            var lea = leagues[key]
            initLeagueInfo(lea, items[lea.itemdef])
        }
    })

})

function initLeagueInfo(webLea, fileLea) {
    var leagueAllInfo = {}
    for (var key in webLea) {
        leagueAllInfo[key] = webLea[key]
    }

    if(fileLea) {
        leagueAllInfo.creationDate = fileLea.creation_date
        leagueAllInfo.image_inventory = fileLea.image_inventory

        var usage = fileLea.tool.usage
        if (usage) {
            leagueAllInfo.tier = usage.tier
            leagueAllInfo.order = usage.order
            leagueAllInfo.free_to_spectate = usage.free_to_spectate
            leagueAllInfo.startDate = new Date(Number(usage.start_date) * 1000)
            leagueAllInfo.endDate = new Date(Number(usage.end_date) * 1000)
            leagueAllInfo.location= usage.location
        }

        var col = mongoService.getDb().collection(collections.leagues)
        col.updateOne({leagueid:leagueAllInfo.leagueid}, leagueAllInfo,{upsert:true}).then(function() {
            console.log("insert or update one:",leagueAllInfo)
        })
    }
}



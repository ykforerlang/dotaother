/**
 * Created by yk on 2016/5/10.
 */
var dota2Web = require("../service/dota2Web")
var kvn = require("keyvalues-node")
var request = require("request")

dota2Web.getSchemaInfo(function(err, res) {
    var resJson = JSON.parse(res)

    var url = resJson.result.items_game_url
    console.log("items game url:", url)

    var stream = request(url)
    var buffers = []
    var nread = 0
    stream.on("data", function(chunk) {
        buffers.push(chunk);
        nread += chunk.length;
    })
    stream.on("end", function() {
        var buffer = new Buffer(nread)
        for (var i = 0, pos = 0; i< buffers.length; i ++) {
            var chunk = buffers[i];
            chunk.copy(buffer, pos);
            pos += chunk.length;
        }
        initLeagueBuffuer(buffer)
    })
})

function initLeagueBuffuer(leagueBuffer) {
    var result = kvn.decode(buffer.toString())
    var items = result.items_game.items

    dota2Web.getLeagueListing({"language": "zh"}, function(err, data) {
        var webLeaList = JSON.parse(data)
        var leagues = webLeaList.result.leagues
        console.log("web league count :", leagues.length)
        for (var key in leagues) {
            var lea = leagues[key]
            console.log("lea: web :", JSON.stringify(lea), " file:",  JSON.stringify(items[lea.itemdef]))
            initLeagueInfo(lea, items[lea.itemdef])
        }
    })
}

function initLeagueInfo(webLea, fileLea) {
    var leagueAllInfo = {}
    for (var key in webLea) {
        leagueAllInfo[key] = webLea[key]
    }

    if(fileLea) {
        leagueAllInfo.creationDate = fileLea.creation_date
        var usage = fileLea.tool.usage
        if (usage) {
            leagueAllInfo.tier = usage.tier
            leagueAllInfo.order = usage.order
            leagueAllInfo.free_to_spectate = usage.free_to_spectate
            leagueAllInfo.startDate = new Date(Number(usage.start_date) * 1000)
            leagueAllInfo.endDate = new Date(Number(usage.end_date) * 1000)
            leagueAllInfo.location= usage.location
        }

        // get icon path
        if (fileLea.image_banner) {
            // econ/leagues/  length is
            var iconname = fileLea.image_banner.substring(13)
            dota2Web.getItemIconPath({iconname:iconname}, function(err, data) {
                if(!err) {
                    var result = JSON.parse(data)
                    if (result.result.path) {
                        console.log("get icon path:", result.result.path)
                        leagueAllInfo.image_banner = resources.iconCDN + result.result.path
                    }
                }


                if(fileLea.image_inventory) {
                    var iconname = fileLea.image_inventory.substring(13)
                    dota2Web.getItemIconPath({iconname:iconname}, function(err, data) {
                        if (!err) {
                            var result = JSON.parse(data)
                            if (result.result.path) {
                                console.log("get icon path:",result.result.path)
                                leagueAllInfo.image_inventory = resources.iconCDN + result.result.path
                            }

                            console.log("get league all info :", leagueAllInfo)
                        }

                        // store in db

                    })
                }
            })
        }
    }
}

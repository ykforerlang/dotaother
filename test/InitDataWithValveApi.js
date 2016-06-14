/**
 * Created by yk on 2016/5/30.
 */

var resources = require("../conf/resources.json")
var collections = resources.mongo.collectionName
var mongoService = require("../service/mongoService")
var dota2Web = require("../service/dota2Web")

var EventEmitter = require('events').EventEmitter
var event = new EventEmitter()

var size = 10

event.on("initLeague", function (skip) {
    var initCount = 0
    mongoService.getCollection(collections.leagues).find()
        .sort({itemdef: -1})
        .skip(skip)
        .limit(size)
        .toArray()
        .then(function (cols) {
            cols.forEach(function (val) {
                initInfo(val, function () {
                    initCount++
                    if (initCount == 10) { // last one
                        event.emit('initLeague', skip + initCount)
                    }
                })
            })
        })

})

setTimeout(function() {
    event.emit('initLeague', 0)
}, 200)
//event.emit('initLeague', 0)

/// init function
var initInfo = function (val, cb) {
    // init icon
    var iconname = val.image_inventory.substring(13)
    dota2Web.getItemIconPath({iconname: iconname}, function (err, data) {
        if (!err) {
            try {
                var result = JSON.parse(data)
                if (result.result.path) {
                    val.image = resources.iconCDN + result.result.path
                    val.iconSolved = 1
                    console.log("get icon path:", result.result.path)
                }
            } catch (exception) {
                console.log("get icon iconname:", iconname, " err:", exception)
            }
        }

        // init price pool
        dota2Web.getLeaguePricePool(val.leagueid, function (err, data) {
            if (!err) {
                try {
                    var result = JSON.parse(data)
                    val.pricePool = result.result.prize_pool
                    val.pricePoolSolved = 1
                    console.log('get price pool success:', val.pricePool)
                } catch (exception) {
                    console.log("get price pool err:", exception, " leagueid:", val.leagueid)
                }
            }

            var col = mongoService.getDb().collection(collections.leagues)
            col.updateOne({leagueid:val.leagueid}, val,{upsert:false}).then(function() {
                console.log("update image pricePool success:",val)
                cb()
            })
        })
    })

}


///奖金池还在 增长的league 定期扫描 （10分钟)
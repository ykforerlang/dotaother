/**
 * Created by yk on 2016/5/9.
 */
var dota2Web = require("../service/dota2Web")
var request = require("request")
var fs = require("fs")

dota2Web.getSchemaInfo(function(err, res) {
    if (err) {
        process.exit(1)
    }

    var resJson = JSON.parse(res)

    var url = resJson.result.items_game_url
    console.log("items game url:", url)

    var itemsGamePath= "../conf/itemsGame.txt"
    var stream = request(url)
    stream.pipe(fs.createWriteStream(itemsGamePath))
    var lineData = new Buffer(1000)
    stream.on("data", function(data) {
        console.log(data.toString())
    })
    stream.on("end", itemsGameFileSolve, itemsGamePath)
})

var itemsGameFileSolve = function(filePath) {

}



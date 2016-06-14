/**
 * Created by yk on 2016/5/4.
 */
var dota2Service = require("../service/dota2Service")

dota2Service.initLeaguesInfo(function(leagues) {
    console.log(leagues)
})
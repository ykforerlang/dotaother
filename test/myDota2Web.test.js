/**
 * Created by yk on 2016/6/14.
 */
var myDota2Web = require('../service/myDota2Web')

myDota2Web.getMatchHistory({league_id:"2339", matches_requested:4}, function(err, data) {
    console.log(err);
    console.log(data.result.matches)
    console.log(data.result.matches.length);
})
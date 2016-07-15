/**
 * Created by yk on 2016/5/27.
 */
"use strict";
var express = require('express');
var resUtil = require('../util/resUtil')
var myDota2Web = require('../service/myDota2Web')
var moment = require("moment")
var log4js = require('log4js');
var router = express.Router();
var log = log4js.getLogger(__filename)

router.get("/:id/getMatches", (req, res) => {
    let leagueid = Number(req.params.id)
    let params = req.query || {}

    let opt = {league_id: leagueid, matches_requested: 30}  // matches_requested is number of series
    if (params.startMatchId)
        opt.start_at_match_id = params.startMatchId

    myDota2Web.getMatchHistory(opt, function (err, data) {
        if (err) {
            log.warn("get league: ", leagueid, " match list err:", err)
            res.send(resUtil.failureRes(err))
            return
        }

        var matches = integrateMatch(data.result.matches)
        res.send(resUtil.successRes(matches))
    })

})


//将赛事列表 转化为 bo几 的列表形式  根据 series_type  判定： 0 is a non-series, 1 is a bo3, 2 is a bo5
function integrateMatch(matches) {
    let data =[]
    for (let i = 0; i < matches.length;) {
        let match = matches[i]
        let series = {
            radiant_team_id:match.radiant_team_id,
            dire_team_id:match.dire_team_id,
            series_type :match.series_type,
            create_time: new moment(match.start_time * 1000).format("YYYY-MM-DD HH时"),
            matches:[match]
        }
        if (match.series_type != 0) { //series
            let seriesId = match.series_id
            for (var j = 1; j < 10; j++) {
                if (i + j >= matches.length)
                    break

                if (matches[i + j].series_id == seriesId) {
                    series.matches.push(matches[i + j])
                } else {
                    break
                }
            }
            i = i + j
        } else {
            i = i + 1
        }
        data.push(series)
    }
    return data
}

module.exports = router;
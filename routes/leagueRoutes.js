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

    let opt = {league_id: leagueid, matches_requested: 30}
    if (params.startMatchId)
        opt.start_at_match_id = params.startMatchId

    myDota2Web.getMatchHistory(opt, function (err, data) {
        if (err) {
            log.warn("get league: ", leagueid, " match list err:", err)
            res.send(resUtil.failureRes(err))
            return
        }

        var matches = integrateMatch(data.result.matches)
        log.debug("get matches:", matches)
        res.send(resUtil.successRes(matches))
    })

})


//将赛事列表 转化为 bo几 的列表形式
var integrateMatch = function (matches) {
    var result = []

    for (var i = 0; i < matches.length;) {
        var sub = {
            radiant_team_id: matches[i].radiant_team_id,
            dire_team_id: matches[i].dire_team_id,
            create_time: new moment(matches[i].start_time * 1000).format("YYYY-MM-DD HH时"),
            sub_matches: [matches[i]]
        }

        for (var j = 1; j < 10; j++) { //最多bo5
            if (i + j >= matches.length) {
                result.push(sub);
                return result;
            }

            if ((sub.radiant_team_id == matches[i + j].radiant_team_id && sub.dire_team_id == matches[i + j].dire_team_id) ||
                (sub.radiant_team_id == matches[i + j].dire_team_id && sub.dire_team_id == matches[i + j].radiant_team_id)) {
                sub.sub_matches.push(matches[i + j])
            } else {
                i = i + j;
                break
            }
        }
        result.push(sub)
    }
}

module.exports = router;
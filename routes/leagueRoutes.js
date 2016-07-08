/**
 * Created by yk on 2016/5/27.
 */
"use strict";
var express = require('express');
var db = require('../service/mongoService')
var resUtil = require('../util/resUtil')
var collections = require('../conf/resources.json').mongo.collectionName
var myDota2Web = require('../service/myDota2Web')
var moment = require("moment")
var log4js = require('log4js');
var router = express.Router();
var log = log4js.getLogger(__filename)

var DEFAULT_SIZE = 10
var DEFAULT_TIER = 'premium'
var MAX_LEAGUEID = 1000000

router.get("/list", function (req, res) {
    var params = req.query || {}
    var lastLeagueid = Number(params.lastLeagueid) || MAX_LEAGUEID
    var tier = params.tier || DEFAULT_TIER
    var size = Number(params.size) || DEFAULT_SIZE
    db.getCollection(collections.leagues)
        .find({leagueid: {$lt: lastLeagueid}, tier: tier}, {fields: {_id: 0, iconSolved: 0, pricePoolSolved: 0}})
        .sort({itemdef: -1})
        .limit(size)
        .toArray()
        .then(function (docs) {
            res.send(resUtil.successRes(docs))
        })
        .catch(function (err) {
            log.warn("get league list err:", err)
            res.send(resUtil.failureRes(err))
        })
})

router.get("/:id/detail", function (req, res) {
    var leagueid = Number(req.params.id)
    log.debug("leagueid:", leagueid)

    db.getCollection(collections.leagues)
        .find({leagueid: leagueid}, {fields: {_id: 0, iconSolved: 0, pricePoolSolved: 0}})
        .limit(1)
        .next()
        .then(function (doc) {
            myDota2Web.getMatchHistory({league_id: leagueid, matches_requested: 10}, function (err, data) {
                var matches = data.result.matches
                log.debug("get matches:", matches)

                doc.matches = integrateMatch(matches)
                res.send(doc)
            })

        })
        .catch(function (err) {
            log.warn("get league: ", leagueid, " detail err:", err)
            res.send(resUtil.failureRes(err))
        })
})

router.get("/:id/getMatches", (req, res) => {
    let leagueid = Number(req.params.id)
    let params = req.query || {}

    let opt = {league_id: leagueid, matches_requested: 10}
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
        res.send(matches)
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
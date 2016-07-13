/**
 * Created by yk on 2016/6/14.
 */

"use strict";
var express = require('express');
var myDota2Web = require('../service/myDota2Web')
var log4js = require('log4js');
var router = express.Router();
var log = log4js.getLogger(__filename)

/**
 * 根据steam webapi获取  某个赛事详情
 */
router.get("/:matchId/detail", (req, res) => {
    let matchId = req.params.matchId;

    myDota2Web.getMatchDetail(matchId, function(err, data) {
        res.send(data.result)
    })
})

module.exports = router;
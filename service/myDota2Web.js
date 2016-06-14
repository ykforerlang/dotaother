/**
 * Created by yk on 2016/6/14.
 *
 * 封装steamWebApi
 */

"use strict";
var webKey = require('../conf/resources.json').webKey;
var request = require('request');
var log4js = require('log4js');
var log = log4js.getLogger(__filename)

var STEAM_API = "https://api.steampowered.com/"

var MyDota2Web = function () {}


/**
 * 根据赛事id  获取比赛列表
 * steam webapi: 获取某个赛事下的比赛： https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v001/?key={}
 * player_name=<name> # 通过玩家名字搜索匹配, 仅限精确匹配
 * hero_id=<id> # 通过特定的英雄搜索, 英雄的ID在你的DOTA安装目录 dota/scripts/npc/npc_heroes.txt 中
 * skill=<skill>  # 0为任意 , 1为N , 2为H, 3为VH
 * date_min=<date> # date in UTC seconds since Jan 1, 1970 (unix time format)
 * date_max=<date> # date in UTC seconds since Jan 1, 1970 (unix time format)
 * account_id=<id> # Steam账号ID (不是Steam的登录ID, 而是数字ID)
 * league_id=<id> # 该联赛ID的比赛记录
 * start_at_match_id=<id> # 从填入的匹配记录ID开始，降序
 * matches_requested=<n> # 默认25场，可以改低
 *
 * @param leagueid
 * @returns {Array}
 */
MyDota2Web.prototype.getMatchHistory = function (options, cb) {
    var partUrl = "IDOTA2Match_570/GetMatchHistory/v001";
    var compUrl = geneCompleteUrl(partUrl, options);
    log.info("gene matchHistory complete url:", compUrl)

    getJsonRes(compUrl, cb)
}

/**
 * steam webapi: http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?key={}&match_id={}
 * @param options
 * @param cb
 */
MyDota2Web.prototype.getMatchDetail = (matchId, cb) => {
    var partUrl = "IDOTA2Match_570/GetMatchDetails/v1"
    var compUrl = geneCompleteUrl(partUrl, {match_id:matchId});
    log.info("gene match detail complete url:", compUrl)

    getJsonRes(compUrl, cb)
}

/**
 * 获取完整的steam api 链接
 * @param partUrl
 * @param options 对应于url上的参数
 * @returns {string}
 */
var geneCompleteUrl = function (partUrl, options) {
    var prefix = STEAM_API + partUrl + "?key=" + webKey + "&";

    var optList = []
    for (var key in options) {
        var value = options[key].toString()
        var sub = key + "=" + value
        optList.push(sub)
    }

    return prefix + optList.join("&")
}

/**
 * 获取json response
 * @param compUrl
 * @param cb
 */
var getJsonRes = function (compUrl, cb) {
    request.get(compUrl, function(err, res, body) {
        if (err) {
            cb(err)
        } else {
           cb(null, JSON.parse(body))
        }
    });
}

module.exports = new MyDota2Web()
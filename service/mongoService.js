/**
 * Created by yk on 2016/5/27.
 */
var log4js = require('log4js');
var mongoOpt = require("../conf/resources.json").mongo
var Mongo = require('mongodb')
var MongoClient = Mongo.MongoClient

var log = log4js.getLogger(__filename)

// 初始化db
MongoClient.connect(mongoOpt.url,mongoOpt.options,  function(err, db) {
    if(err) {
        log.warn("init mongodb error:", err)
    } else {
        log.info('init mongodb success')
        exports.getDb = function() {
            return db
        }

        exports.getCollection = function(name) {
            return this.getDb().collection(name)
        }
    }
})
/**
 * Created by yk on 2016/5/13.
 */
var log4js = require('log4js');
var mongoOpt = require("../conf/resources.json").mongo
var Mongo = require('mongodb')
var MongoClient = Mongo.MongoClient
var Collection = Mongo.Collection

var log = log4js.getLogger(__filename)


// simple implement
function getEnhancerFun(fun) {
    var result = function() {
        var argu = Array.prototype.slice.call(arguments,0)
        var collName = argu.shift()

        if (MyMongo.db) {
            var col = MyMongo.db.collection(collName)
            fun.apply(col, argu)
        } else {
            console.log("db not init or  init error, try later")
        }
    }
    return result
}

function MyMongo () {
}
// 初始化db
MongoClient.connect(mongoOpt.url,mongoOpt.options,  function(err, db) {
    if (! err)
        MyMongo.db = db

    var col = db.collection(mongoOpt.collections.leagues)

    col.drop() //TODO init when test
    col.createIndex("league_id", {unique:true})
    log.info("init collection mongoOpt.collections.leagues")

})
var collProto = Collection.prototype
var mmProto = MyMongo.prototype
// 代理all Function in collection
for (var key in collProto ) {
    var des = Object.getOwnPropertyDescriptor(collProto, key)
    var val = des.value || des.get //
    if (typeof  val == "function") {
        console.log("add key:", key)
        mmProto[key] = getEnhancerFun(val)
    }
}

MyMongo.constructor = Collection
var mm = new MyMongo()

module.exports = mm

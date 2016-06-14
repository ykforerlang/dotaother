/**
 * Created by yk on 2016/5/27.
 */

// execute by mongo  to init collections   mongod --dbpath /data

var conn = new Mongo();
var db = conn.getDB("dotaother");

db.leagues.ensureIndex({leagueid:-1},{unique:true})
db.leagues.ensureIndex({itemdef:-1},{unique:true})
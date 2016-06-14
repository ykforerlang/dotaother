/**
 * Created by yk on 2016/5/10.
 */
var resources = require('../conf/resources.json')

var log4js = require('log4js');
log4js.configure(resources.logs, { cwd: __dirname })

console.log(__dirname)
var logger = log4js.getLogger(__filename)
logger.debug("debug...")
logger.warn("warn...")

var logger2 = log4js.getLogger("mongo.sub")
logger2.debug("main debug..")

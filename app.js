var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var resources = require("./conf/resources.json")

//init log
var log4js = require('log4js');
log4js.configure(resources.logs, { cwd: __dirname })

var log = log4js.getLogger(__filename)

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// log every request
app.all('*', function(req, res, next) {
  log.info("handler request path:", req.path, " params:", req.params, " query:", req.query, " body:", req.body)
  next()
})

app.use('/', require('./routes/index'));
app.use("/league", require('./routes/leagueRoutes'));
app.use("/match", require("./routes/match"))


module.exports = app;

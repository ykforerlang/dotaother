var express = require('express');
var db = require('../service/mongoService')
var collectionName = require('../conf/resources.json').mongo.collectionName
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;

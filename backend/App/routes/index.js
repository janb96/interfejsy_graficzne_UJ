var express = require('express');
var router = express.Router();

//example how to import model
// let edges = require('./../model/graphDatabase.js');

router.get('/', function(req, res, next) {

  	res.send("it works!");

});

router.get('/hello', function(req, res, next) {

  	res.send("hello");

});


module.exports = router;

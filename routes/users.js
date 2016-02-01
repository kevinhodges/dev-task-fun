var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User.js');

/* GET /Users listing. */
router.get('/', function(req, res, next) {
  User.find(function (err, Users) {
    if (err) return next(err);
    res.json(Users);
  });
});

/* GET /Users/id */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /Users */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /Users/:id */
router.put('/:id', function(req, res, next) {
	console.log(req);
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /Users/:id */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
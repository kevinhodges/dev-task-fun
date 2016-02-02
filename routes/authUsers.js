var express = require('express');
var router = express.Router();
var config = require('../config');
var mongoose = require('mongoose');
var authUser = require('../models/authUser.js');
var jwt    = require('jsonwebtoken');


/* POST /setup - Post to create your sample user */
router.post('/setup', function(req, res, next) {
  authUser.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /authenticate - Post from a form to then check against our users */
router.post('/authenticate', function(req, res, next) {
  // Find our user
  authUser.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;
    // Can't find our username? Send an error message.
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // Got our username? Great. We now check if our password matches.
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // If our password is right:
        // We now create a token
        var token = jwt.sign(user, config.secret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // Let our user know that we have a token for them, and give it to them as a response.
        res.json({
          success: true,
          message: 'Username and password are correct, enjoy your token good sir / mam.',
          token: token
        });
      }   

    }

  });
});


module.exports = router;
var express = require('express');
var router = express.Router();
var config = require('../config');
var mongoose = require('mongoose');
var authUser = require('../models/authUser.js');
var jwt    = require('jsonwebtoken');


/* POST /setup - Post to create your sample user */ // I might get this reading from a config file of allowed users or something.
router.get('/setup', function(req, res, next) {
  var adminUser = {
    name: 'admin',
    password: 'admin_pass',
    admin: true
  };
  authUser.create(adminUser, function (err, post) {
    if (err) return next(err);
    // Make sure we tell the admin who is setting the API up that the user table is now set up.
    res.json({ success: true, message: 'User database set up, API keys can now be requested!' });
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
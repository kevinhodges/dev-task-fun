var jwt    = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var config = require('../config');

module.exports = function(req, res, next) {
// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.secret, function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// If all good, then we make sure we allow access for the other routes and beyond.
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// If we don't have our token, don't let that mother-F at the API.
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
};
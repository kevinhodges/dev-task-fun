var mongoose = require('mongoose');
// This will make our email validation really easy!
var validator = require('validator');

// Introduce a schema just to bring some consistency to my API, we should also do some validation here too.
var UserSchema = new mongoose.Schema({
	forename: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: String, required: true, validate: [ validator.isEmail, 'Please enter a valid email, we dont mess around at HX.' ] },
	updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
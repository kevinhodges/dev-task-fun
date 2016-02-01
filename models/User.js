var mongoose = require('mongoose');

// Introduce a schema just to bring some consistency to my api
var UserSchema = new mongoose.Schema({
	forename: String,
	surname: String,
	email: String,
	updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
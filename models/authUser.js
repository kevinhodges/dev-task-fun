var mongoose = require('mongoose');

// This is a schema for authenticating users and giving them an API Key
var authUserSchema = new mongoose.Schema({
    name: String, 
    password: String, 
    admin: Boolean 
});

module.exports = mongoose.model('authUser', authUserSchema);
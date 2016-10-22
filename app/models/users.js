/*
	USER MODEL (APP/MODELS/USER.JS)
	The user model that we define will be used when creating and getting users. To create a Mongoose model, let’s create the file app/models/user.js
*/

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
	name: String,
	password: String,
	admin: Boolean
}));
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user = new Schema({
	email: String,
	password: String,
	fullname: String
});


var post = new Schema({
	title: String,
	content: String,
	author: String,
	postedAt: { type: Date, default: Date.now }
});


var comment = new Schema({
	content: String,
	author: String,
	postedAt: { type: Date, default: Date.now },
	post_id: Schema.Types.ObjectId
})


exports.user = mongoose.model('user', user);
exports.post = mongoose.model('post', post);
exports.comment = mongoose.model('comment', comment);
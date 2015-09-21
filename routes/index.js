var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../model/models.js');
var path = require('path');

var url = 'mongodb://localhost:27001/blog';
var url2 = 'mongodb://localhost:27002/blog';

/* GET home page. */
router.get('/', function(req, res, next) {
	mongoose.connect(url2, function (err) {
		if (err) {console.log(err)};
		model.post.find({}, function (err, data) {
	  		res.render('index', { title: 'Express', posts: data});
			mongoose.disconnect();
		});
	})
});


router.get('/post/create', function (req, res) {
	res.sendFile(path.join(__dirname + '/../public/postform.html'));
});

router.post('/post/create', function (req, res) {
	mongoose.connect(url, function (err) {
		if (err) {console.log(err)};
		// req.body.author = "erinlee";
		console.log(req.cookies);
		if(req.cookies.user){
			model.user.findOne({
				_id: req.cookies.user
			}, function (err, data) {
				req.body.author = data.fullname;
				req.body.postedAt = new Date().toISOString();

				var post = new model.post(req.body);
				
				post.save(function (err, data) {
					if (err) {console.log("Danger user err :"+err)};
				  	// res.json(data);
				  	res.redirect('/');
				  	mongoose.disconnect();
				})
			})
		}
	});
})

router.get('/post/:id', function(req, res, next) {
	// console.log("hello");
	mongoose.connect(url2, function (err) {
		if (err) {console.log(err)};
		console.log(req.params.id);
		model.post.findOne({
			_id: req.params.id
		}, function (err, data) {
			var post = data;
			model.comment.find({
				post_id: data._id
			}, function (err, data) {
	  			res.render('post', { post: post, comments: data});
				mongoose.disconnect();
			})
		});
	})

});

router.post('/comment/:id', function (req, res) {
	mongoose.connect(url, function (err) {
		if (err) {console.log(err)};
		// content: String,
		// author: String,
		// postedAt: { type: Date, default: Date.now },
		// post_id: Schema.Types.ObjectId

		console.log(req.cookies);
		if(req.cookies.user){
			model.user.findOne({
				_id: req.cookies.user
			}, function (err, data) {
				req.body.author = data.fullname;
				req.body.postedAt = new Date().toISOString();
				req.body.post_id = req.params.id;

				var comment = new model.comment(req.body);
				
				comment.save(function (err, data) {
					if (err) {console.log("Danger user err :"+err)};
				  	// res.json(data);
				  	res.redirect('/post/'+req.params.id);
				  	mongoose.disconnect();
				})
			})
		}
	});
})




module.exports = router;

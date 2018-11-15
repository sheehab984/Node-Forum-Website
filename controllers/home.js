var express = require('express');
var router = express.Router();
var postsModel = require.main.require('./models/posts-model');
var category = require.main.require('./models/category-model');




router.get('/', function (req, res) {
	var p = req.query.p;
	var selected = 0;
	if (p == null) {
		selected = 1;
	} else {
		selected = p;
	}
	postsModel.getPostCount(function (result) {
		var pageCount = Math.ceil(result / 5);
		//console.log(selected*5);
		postsModel.getAllPosts(selected * 5 - 5, function (posts) {
			//console.log();
			category.getCategories(function (cat) {
				category.categoryPostCount(cat, function (counts) {

					for (var i = 0; i < counts.length; i++) {
						for (var j = 0; j < cat.length; j++) {
							if (counts[i].id == cat[j].id) {
								cat[j].count = counts[i].count;
								break;
							}
						}
					}
					console.log(cat);
					res.render('index', {
						result: posts,
						count: pageCount,
						selected: selected,
						categories: cat,
						user : req.session.cur_user
					});
				});

			});
		});
	});
});

router.get('/search', function (req, res) {
	selected = 1;
	var search = req.query.search;
	postsModel.getPostCountS(search,function (result) {
		var pageCount = Math.ceil(result / 5);
		//console.log(selected*5);
		postsModel.getAllPostsS(search,selected * 5 - 5, function (posts) {
			//console.log();
			category.getCategories(function (cat) {
				category.categoryPostCount(cat, function (counts) {

					for (var i = 0; i < counts.length; i++) {
						for (var j = 0; j < cat.length; j++) {
							if (counts[i].id == cat[j].id) {
								cat[j].count = counts[i].count;
								break;
							}
						}
					}
					console.log(cat);
					res.render('index', {
						result: posts,
						count: pageCount,
						selected: selected,
						categories: cat,
						user : req.session.cur_user
					});
				});

			});
		});
	});
});



module.exports = router;
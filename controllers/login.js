var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var validationRules = require.main.require('./validation-rules/rules');
var asyncValidator = require('async-validator');

router.get('/', function (req, res) {
	res.render('login', {
		errs: []
	});
});

router.post('/', function (req, res) {
	var un = req.body.email;
	var ps = req.body.pass;
	var rules = validationRules.login;

	var data = {
		email: req.body.email,
		pass: req.body.pass
	};
	var validator = new asyncValidator(rules);

	validator.validate(data, function (errors, fields) {
		if (!errors) {
			userModel.validateUser(un, ps, function (user) {
				if(user){
					//console.log("here1");
					if(user.utype == 1){
						req.session.cur_user = user;
						res.redirect('/home');
					}
					else if(user.utype == 0){
						req.session.cur_user = user;
						res.redirect('/admin');
					}
				}
				else{
					//console.log("here");
					res.render('login', {
						errs: [{message: "No user Found!"}]
					});	
				}
			});
		} else {
			res.render('login', {
				errs: errors
			});
		}
	});
});

module.exports = router;
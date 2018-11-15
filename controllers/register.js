var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var validationRules = require.main.require('./validation-rules/rules');
var asyncValidator = require('async-validator');

router.get('/', function(req, res){
	res.render('register',{errs:[]});
	//res.send('Hello');
});

router.post('/', function(req, res){
	var un = req.body.email;
	var ps = req.body.pass;
	var rules = validationRules.register;

	var data = {
		email: req.body.email,
		pass: req.body.pass,
		rpass: req.body.rpass
	};
	console.log("here");
	var validator = new asyncValidator(rules);
	validator.validate(data, function (errors, fields) {
		console.log("here2");
		if (data.pass == data.rpass){
			console.log("here3");
			if (!errors) {
				console.log("here1");
				userModel.registerUser(un, ps, function(status){
					console.log(status);
					if(status)
					{
						req.session.username = un;
						res.redirect('/login');
					}
					else
					{
						res.send('Invalid');
					}
				});
			} else {
				
				res.render('register', {
					errs: errors
				});
			}
		}
		else{
			res.render('register', {
				errs: [{message:"The passwords do not match."}]
			});
		}

	});
	
	
});

module.exports = router;
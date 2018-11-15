var express = require('express');
var router = express.Router();
var replyModel = require.main.require('./models/reply-model');
var validationRules = require.main.require('./validation-rules/rules');
var asyncValidator = require('async-validator');


router.post('/:id', function (req, res) {
	var rules = validationRules.reply;
    var user_id = req.session.cur_user.id;
    var post_id = req.params.id;
    console.log( user_id);
    console.log(post_id);
	var data = {
		reply: req.body.reply,
    };
    var validator = new asyncValidator(rules);

	validator.validate(data, function (errors, fields) {
		if (!errors) {
            replyModel.addReply(data.reply,user_id,post_id , function( result ){
                if(result){
                    console.log("successfull");
                    res.redirect("/post?id="+post_id);
                }
                else{
                    res.redirect("/post?id="+post_id);
                }
            });
        }
        else{

        }
    });
});


module.exports = router;
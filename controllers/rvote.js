var express = require('express');
var router = express.Router();
var r_vote = require.main.require('./models/r_vote-model');
var reply = require.main.require('./models/reply-model');

router.get('/like/:post_id/:reply_id/:page_no', function (req, res) {
    var reply_id = req.params.reply_id;
    var post_id = req.params.post_id;
    var page_no = req.params.page_no;
    var user_id = req.session.cur_user.id;
    r_vote.vote(0,user_id,reply_id,function(result){
        //console.log(result);
        res.redirect("/post?id="+post_id+"&p="+page_no);
    });
});

router.get('/dislike/:post_id/:reply_id/:page_no', function (req, res) {
    var reply_id = req.params.reply_id;
    var post_id = req.params.post_id;
    var page_no = req.params.page_no;
    var user_id = req.session.cur_user.id;
    r_vote.vote(1,user_id,reply_id,function(result){
        //console.log(result);
        res.redirect("/post?id="+post_id+"&p="+page_no);
    });
});

module.exports = router;
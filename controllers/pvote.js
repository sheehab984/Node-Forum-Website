var express = require('express');
var router = express.Router();
var p_vote = require.main.require('./models/p_vote-model');

router.get('/like/:post_id/:page_no', function (req, res) {
    var post_id = req.params.post_id;
    var page_no = req.params.page_no;
    var user_id = req.session.cur_user.id;
    p_vote.vote(0,user_id,post_id,function(result){
        //console.log(result);
        res.redirect("/post?id="+post_id+"&p="+page_no);
    });
});

router.get('/dislike/:post_id/:page_no', function (req, res) {
    var post_id = req.params.post_id;
    var page_no = req.params.page_no;
    var user_id = req.session.cur_user.id;
    p_vote.vote(1,user_id,post_id,function(result){
        res.redirect("/post?id="+post_id+"&p="+page_no);
    });
});
module.exports = router;
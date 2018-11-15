var express = require('express');
var router = express.Router();
var postsModel = require.main.require('./models/posts-model');
var category = require.main.require('./models/category-model');
var reply = require.main.require('./models/reply-model');
var p_vote = require.main.require('./models/p_vote-model');
var reply = require.main.require('./models/reply-model');
var r_vote = require.main.require('./models/r_vote-model');

router.get('/', function (req, res) {
    //console.log(req.query.id);
    var page;
    var count;
    if (req.query.p) {
        page = req.query.p;
    } else {
        page = 1;
    }
    reply.replyCount(req.query.id, function (resb) {
        count = Math.ceil(resb / 5);
    });
    postsModel.getPost(req.query.id, page * 5 - 5, function (result) {
        category.getCategories(function (cat) {
            p_vote.likeCount(req.query.id, function (vote_count_l) {
                p_vote.dislikeCount(req.query.id, function (vote_count_d) {
                    reply.reply_list(req.query.id, function (reply_list) {
                        if (reply_list.length != 0) {
                            r_vote.likeCount(reply_list, function (reply_l_count) {
                                r_vote.dislikeCount(reply_list, function (reply_d_count) {
                                    category.categoryPostCount(cat, function (counts) {
                                        for (var i = 0; i < counts.length; i++) {
                                            for (var j = 0; j < cat.length; j++) {
                                                if (counts[i].id == cat[j].id) {
                                                    cat[j].count = counts[i].count;
                                                    break;
                                                }
                                            }
                                        }
                                        res.render("posts", {
                                            res: result,
                                            categories: cat,
                                            count: count,
                                            selected: page,
                                            pid: req.query.id,
                                            p_like: vote_count_l,
                                            p_dislike: vote_count_d,
                                            r_like_count: reply_l_count,
                                            r_dislike_count: reply_d_count,
                                            user : req.session.cur_user
                                        });
                                    });

                                });
                            });
                        } else {
                            category.categoryPostCount(cat, function (counts) {
                                for (var i = 0; i < counts.length; i++) {
                                    for (var j = 0; j < cat.length; j++) {
                                        if (counts[i].id == cat[j].id) {
                                            cat[j].count = counts[i].count;
                                            break;
                                        }
                                    }
                                }
                                res.render("posts", {
                                    res: result,
                                    categories: cat,
                                    count: count,
                                    selected: page,
                                    pid: req.query.id,
                                    p_like: vote_count_l,
                                    p_dislike: vote_count_d,
                                    r_like_count: [],
                                    r_dislike_count: [],
                                    user : req.session.cur_user
                                });
                            });
                        }

                    });
                });
            });
        });
    });

});

module.exports = router;
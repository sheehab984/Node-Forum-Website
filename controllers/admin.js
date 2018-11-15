var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var categoryModel = require.main.require('./models/category-model');
var postsModel = require.main.require('./models/posts-model');
var p_vote = require.main.require('./models/p_vote-model');

function compare(a, b) {
    if (a.count < b.count)
        return 1;
    if (a.count > b.count)
        return -1;
    return 0;
}

router.get('/', function (req, res) {
    if(!req.session.cur_user.utype == 0){
        res.redirect("/home");
    }
    userModel.getAllUser(function (result) {
        //console.log(result[0]);
        categoryModel.getCategories(function (cat) {
            postsModel.getAllPostsA(function (posts) {
                p_vote.aLikeCount(posts, function (likeList) {
                    p_vote.aDislikeCount(posts, function (dislikeList) {
                        userModel.userCount(function (userCount) {
                            postsModel.getPostCount(function (postCount) {
                                toplike = likeList.sort(compare);
                                res.render('admin-index', {
                                    users: result,
                                    categories: cat,
                                    posts: posts,
                                    likeList: likeList,
                                    dislikeList: dislikeList,
                                    topLike: toplike,
                                    userCount: userCount,
                                    postCount:postCount,
                                    user: req.session.cur_user
                                });
                            });
                        });
                    });
                });
            });
        });

    });
});
router.post("/uEdit", function (req, res) {
    var id = req.body.id;
    var username = req.body.username;
    userModel.editUser(id, username, function (resuslt) {
        if (resuslt) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //userModel.editUser()
});
router.post("/cEdit", function (req, res) {
    var id = req.body.id;
    var username = req.body.username;
    categoryModel.editCat(id, username, function (resuslt) {
        if (resuslt) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //userModel.editUser()

    console.log(id);
    console.log(username);
});


router.post("/udel", function (req, res) {
    var id = req.body.id;
    userModel.deleteUser(id, function (resuslt) {
        if (resuslt) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //userModel.editUser()
});
router.post("/pdel", function (req, res) {
    var id = req.body.id;
    postsModel.deletePost(id, function (resuslt) {
        if (resuslt) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //userModel.editUser()
});


router.post("/cdel", function (req, res) {
    var id = req.body.id;
    categoryModel.deleteCat(id, function (resuslt) {
        if (resuslt) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    //userModel.editUser()
});

module.exports = router;
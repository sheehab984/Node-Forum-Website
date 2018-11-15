var express = require('express');
var router = express.Router();
var postsModel = require.main.require('./models/posts-model');
var category = require.main.require('./models/category-model');
var validationRules = require.main.require('./validation-rules/rules');
var asyncValidator = require('async-validator');


router.get('/', function (req, res) {
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
            res.render("add-post", {
                categories: cat,
                errs: [],
                user : req.session.cur_user
            });
        });
    });
});

router.post('/', function (req, res) {
    var rules = validationRules.post;

    var data = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category
    };
    var validator = new asyncValidator(rules);
    validator.validate(data, function (errors, fields) {
        if (!errors) {
            console.log(req.session.cur_user);
            postsModel.addPost(data.title, data.content, data.category, req.session.cur_user.id, function (result) {
                if (result == true) {
                    res.redirect('/home');
                } else {

                }

            })
        } else {
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
                    res.render("add-post", {
                        categories: cat,
                        errs: errors,
                        user : req.session.cur_user
                    });
                });

            });
        }
    });

});
module.exports = router;
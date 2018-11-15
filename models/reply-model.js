var db = require('./db');
module.exports = {
    replyCount: function (post_id, callback) {
        var sql = "select count(*) as count from reply where post_id =?"
        db.executeQuery(sql, [post_id], function (result) {
            if (result) {
                callback(result[0].count);
            }
        });
    },
    addReply: function (content, user_id, post_id, callback) {
        var sql = "insert into reply values(?,?,?,?,?)";
        var param = [null, post_id, user_id, content, null];
        db.executeQuery(sql, param, function (result) {
            if (result) {
                callback(true);
            }
            else{
                callback(false);
            }
        });
    },
    reply_list: function (post_id, callback) {
        var sql = "select * from reply where post_id = ?";
        var param = [post_id];
        db.executeQuery(sql, param, function (result) {
            if (result) {
                callback(result);
            }
            else{
                callback(false);
            }
        });
    },
}
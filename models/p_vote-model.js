var db = require('./db');
var async = require("async");
module.exports = {
    vote : function(ltype,user_id,post_id,callback){
        var sql = "select * from p_vote where user_id = ? and post_id = ?";
        var param = [user_id,post_id];
        db.executeQuery(sql,param,function(result){
            //console.log(result);
            if(result.length != 0){
                var sql = "update p_vote set l_type=? where user_id = ? and post_id = ?";
                var param = [ltype,user_id,post_id];
                db.executeQuery(sql,param,function(res){
                    callback(true);
                });
            }
            else{
                var sql = "insert into p_vote values(?,?,?,?,?)";
                var param = [null,user_id,post_id,null,ltype];
                db.executeQuery(sql,param,function(res){
                    callback(true);
                });
               // console.log("here1");
            }
            
        });
    },
    aLikeCount : function(postList,callback){
        var r_like_count = []
        //console.log(postList);
        async.forEachOf(postList,function(data,i){
            var sql = "select count(*) as count ,post_id from p_vote where post_id = ? and l_type=0";
            db.executeQuery(sql,[data.id],function(result){
                if(result){
                    r_like_count.push({
                        id : data.id,
                        count : result[0].count
                    });
                    //console.log(r_like_count);
                    if(i+1 == postList.length){
                        callback(r_like_count)
                    }
                }
            });

        });
    },
    aDislikeCount : function(postList,callback){
        var r_like_count = []
        //console.log(postList);
        async.forEachOf(postList,function(data,i){
            var sql = "select count(*) as count ,post_id from p_vote where post_id = ? and l_type=1";
            db.executeQuery(sql,[data.id],function(result){
                if(result){
                    r_like_count.push({
                        id : data.id,
                        count : result[0].count
                    });
                    //console.log(r_like_count);
                    if(i+1 == postList.length){
                        callback(r_like_count)
                    }
                }
            });

        });
    },
    likeCount:function(post_id,callback){
        var sql = "select count(*) as count from p_vote where post_id = ? and l_type=0"
        var param = [post_id];
        db.executeQuery(sql,param,function(result){
            if(result){
                callback(result[0].count);
            }
        });
    },
    dislikeCount:function(post_id,callback){
        var sql = "select count(*) as count from p_vote where post_id = ? and l_type=1"
        var param = [post_id];
        db.executeQuery(sql,param,function(result){
            if(result){
                callback(result[0].count);
            }
        });
    }
}
var db = require('./db');
var async = require("async");
function getLike(id,callback){

}
module.exports = {
    vote : function(ltype,user_id,reply_id,callback){
        var sql = "select * from r_vote where user_id = ? and reply_id = ?";
        var param = [user_id,reply_id];
        db.executeQuery(sql,param,function(result){
            if(result.length != 0){
                var sql = "update r_vote set l_type=? where user_id = ? and reply_id = ?";
                var param = [ltype,user_id,reply_id];
                db.executeQuery(sql,param,function(res){
                    callback(true);
                });
            }
            else{
                var sql = "insert into r_vote values(?,?,?,?,?)";
                var param = [null,user_id,reply_id,null,ltype];
                db.executeQuery(sql,param,function(res){
                    callback(true);
                });
            }
        });
    },
    likeCount:function(r_id_list,callback){
        var r_like_count = []
        async.forEachOf(r_id_list,function(data,i,inner_callback){
            var sql = "select count(*) as count ,id from r_vote where reply_id = ? and l_type=0";
            db.executeQuery(sql,[data.id],function(result){
                if(result){
                   // console.log(sql = "select count(*) as count,id from r_vote where reply_id = ? and l_type=0");
                    //console.log([data.id]);
                    r_like_count.push({
                        id : data.id,
                        count : result[0].count
                    });
                    if(i+1 == r_id_list.length){
                        callback(r_like_count)
                    }
                }
            });

        });
    },
    dislikeCount:function(r_id_list,callback){
        var r_like_count = []
        async.forEachOf(r_id_list,function(data,i,inner_callback){
            var sql = "select count(*) as count ,id from r_vote where reply_id = ? and l_type=1";
            db.executeQuery(sql,[data.id],function(result){
                if(result){
                    r_like_count.push({
                        id : data.id,
                        count : result[0].count
                    });
                    if(i+1 == r_id_list.length){
                        callback(r_like_count)
                    }
                }
            });

        });
    }
}
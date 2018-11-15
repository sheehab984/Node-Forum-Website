var db = require('./db');
var async = require("async");
module.exports = {
    getCategories : function(callback){
        var sql = "select * from category";
        db.executeQuery(sql,null,function(result){
            callback(result);
        });
    },
    editCat(id,username,callback){
		var sql = "update category set name =? where id =?";
		db.executeQuery(sql,[username,id],function(result){
			if(!result){
				callback(false);
			}
			else{
				callback(true);
			}
		});
	},
	deleteCat(id,callback){
		var sql = "delete from category where id = ?";
		db.executeQuery(sql,[id],function(result){
			if(!result){
				callback(false);
			}
			else{
				callback(true);
			}
		});
    },
    categoryPostCount: function(catList, callback){
        var catPostCount = []
        //console.log(postList);
        async.forEachOf(catList,function(data,i){
            var sql = "select count(*) as count from posts where cat_id = ?";
            db.executeQuery(sql,[data.id],function(result){
                if(result){
                    catPostCount.push({
                        id : data.id,
                        count : result[0].count
                    });
                    //console.log(r_like_count);
                    if(i+1 == catList.length){
                        callback(catPostCount)
                    }
                }
            });

        });
    }
}
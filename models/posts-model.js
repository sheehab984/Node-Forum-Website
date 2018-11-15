var db = require('./db');

// alternative shortcut
function timeConversion(millisec) {

	var seconds = (millisec / 1000).toFixed(1);

	var minutes = (millisec / (1000 * 60)).toFixed(1);

	var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

	var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

	if (seconds < 60) {
		return seconds + " Seconds";
	} else if (minutes < 60) {
		return Math.floor(minutes) + " Minutes";
	} else if (hours < 24) {
		return Math.floor(hours) + " Hours";
	} else {
		return Math.floor(days) + " Days"
	}
}


module.exports = {
		getAllPosts: function (offset, callback) {
			var sql;
			var parm;
			if (offset == 0) {
				sql = "select * from posts ORDER by time DESC LIMIT 5";
				parm = null;
			} else {
				sql = "select * from posts ORDER by time DESC LIMIT ?,5";
				parm = [offset]
			}
			db.executeQuery(sql, parm, function (result) {
				if (result) {
					for (var i = 0; i < result.length; i++) {

						var d = new Date(result[i].time.toString());
						result[i].time = timeConversion(Date.now() - d.getTime())

					}
					callback(result);
				} else {
					callback([]);
				}
			});
		},
		getAllPostsS: function (search,offset, callback) {
			var sql;
			var parm;
			if (offset == 0) {
				sql = "select * from posts where title like '%"+search+"%'"+" ORDER by time DESC LIMIT 5 ";
				parm = null;
			} else {
				sql = "select * from posts where title like '%"+search+"%'"+" ORDER by time DESC LIMIT ?,5 ";
				parm = [offset]
			}
			db.executeQuery(sql, parm, function (result) {
				if (result) {
					for (var i = 0; i < result.length; i++) {

						var d = new Date(result[i].time.toString());
						result[i].time = timeConversion(Date.now() - d.getTime())

					}
					callback(result);
				} else {
					callback([]);
				}
			});
		},
		getAllPostsA: function ( callback) {
			var sql;
			var parm;
			
			sql = "select * from posts";
			
			db.executeQuery(sql, null, function (result) {
				if (result) {
					callback(result);
				} else {
					callback([]);
				}
			});
		},
		getPostCount: function (callback) {
			var sql = "select count(*) as count from posts";
			db.executeQuery(sql, null, function (result) {
				if (result) {
					callback(result[0].count);
				}
			});
		},
		getPostCountS: function (search, callback) {
			var sql = "select count(*) as count from posts where title like '%"+search+"%'";
			db.executeQuery(sql, null, function (result) {
				if (result) {
					console.log(result[0].count);
					callback(result[0].count);
				}
			});
		},
		deletePost: function(id,callback){
			var sql = "delete from posts where id = ?";
			db.executeQuery(sql, [id], function (result) {
				if (result) {
					callback(true);
				}
				else{
					callback(false);
				}
			});
		},
		addPost: function (title, content, category, user_id, callback) {
			var sql = "insert into posts values(?,?,?,?,?,?,?,?)";
			var parm = [null, title, content, category, null, user_id, 0, 0];
			db.executeQuery(sql, parm, function (result) {
				if (result) {
					callback(true);
				} else {
					callback(false);
				}
			});
		},
		getPost: function (id,offset, callback) {
			var sql = "select * from posts inner join users on posts.user_id = users.id  where posts.id = ?";
			var parm =[id];
			//console.log("posts");
			db.executeQuery(sql, parm, function (posts) {

					if (posts) {
						//console.log("here");
						if (offset == 0) {
							sql =  "select reply.id as id,reply.content,reply.time,users.username from reply inner join users on reply.user_id = users.id where post_id = ? ORDER by reply.time DESC LIMIT 5";
							parm = [id];
							
							//console.log(sql);
						} else {
							sql = "select reply.id as id,reply.content,reply.time,users.username from reply inner join users on reply.user_id = users.id where post_id = ? ORDER by reply.time DESC LIMIT ?,5";
							parm = [id,offset]
							//console.log(parm);
							
						}
						db.executeQuery(sql, parm, function (replys) {
								if (replys) {
									//console.log(replys);
									callback({posts:posts,replys :replys});
								} else {
									callback(null);
								}
							});
						}
						else {
							//console.log("here1");
							callback(null);
						}
					});

			}

		}
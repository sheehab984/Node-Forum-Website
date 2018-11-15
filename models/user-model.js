var db = require('./db');
module.exports = {
	validateUser: function(username, password, callback){
		var sql = "SELECT * FROM users WHERE username=? AND password=?";
		//console.log(sql);
		var sqlParam = [username, password];
		db.executeQuery(sql, sqlParam, function(result){
			if(!result)
			{
				callback(false);
			}
			else
			{
				callback(result[0]);
				//console.log(result[0]);
				
			}
		});
	},
	registerUser: function(un,pass,callback){
		var sql = "insert into users (`username`,`password`,`utype`) values (?,?,1)";
		var sqlParam = [un,pass];
		db.executeQuery(sql,sqlParam,function(result){
			if(!result){
				callback(false);
			}
			else{
				callback(true);
			}
		});
	},
	getAllUser:function (callback){
		var sql = "select * from users";
		db.executeQuery(sql,null,function(result){
			if(!result){
				callback(false);
			}
			else{
				callback(result);
			}
		});
	},
	editUser(id,username,callback){
		var sql = "update users set username =? where id =?";
		db.executeQuery(sql,[username,id],function(result){
			if(!result){
				callback(false);
			}
			else{
				callback(true);
			}
		});
	},
	deleteUser(id,callback){
		var sql = "delete from users where id = ?";
		db.executeQuery(sql,[id],function(result){
			if(!result){
				callback(false);
			}
			else{
				callback(true);
			}
		});
	},
	userCount(callback){
		var sql = "select count(*) as count from users";
		db.executeQuery(sql,null ,function(result){
			if(!result){
				callback(false);
			}
			else{
				callback(result[0].count);
			}
		});
	},
};

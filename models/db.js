var con = require("../config.json");

var mysql = require('mysql');
var connection = mysql.createConnection(con.test);


module.exports = {
	executeQuery: function(sql, params, callback){
		if(params == null)
		{
			connection.query(sql, function(error, result){
				if(error)
				{
					console.log(error);
				}
				//console.log(1);
				callback(result);
			});
		}
		else
		{
			connection.query(sql, params, function(error, result){
				if(error)
				{
					console.log(error);
				}
				callback(result);
			});
		}
	}
};

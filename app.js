// DECLARATION
var express = require('express');
var app = express();
var port = 1337;
var bodyParser = require('body-parser');
var expressSession = require('express-session');


var login = require('./controllers/login');
var register = require('./controllers/register');
var logout = require('./controllers/logout');
var home = require('./controllers/home');
var addPost = require('./controllers/addPost');
var post = require('./controllers/post');
var reply = require('./controllers/reply');
var pvote = require('./controllers/pvote');
var rvote = require('./controllers/rvote');
var admin = require('./controllers/admin');


// CONFIGURATION
app.set('view engine', 'ejs');


// MIDDLEWARES
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret: 'my top secret pass', saveUninitialized: true, resave: false}));
app.use(express.static(__dirname + '/public'));




app.use('*', function (req, res, next) {
	if (req.originalUrl == '/login' || req.originalUrl == '/register' ) {
		next();
	} else {
		if (!req.session.cur_user) {
			res.redirect('/login');
			return;
		}
		next();
	}
});

app.get('/', function(req, res){
	res.redirect("/home");
});


// ROUTES
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);
app.use('/home', home);
app.use('/addPost', addPost);
app.use('/post', post);
app.use('/reply', reply);
app.use('/pvote',pvote);
app.use('/rvote',rvote);
app.use('/admin',admin);



// SERVER START
app.listen(port, function(){
	console.log('Server started successfully ...');
});
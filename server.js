var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session'); 
var methodOverride = require('method-override');
var bparser = require('body-parser');
var autoprefixer  = require('express-autoprefixer');



// Model controllers (rather than routes)
var routes = {
  application_controller: require('./controllers/application_controller')
};

// Instantiate the app
var app = express();

// Override POST to have DELETE and PUT
app.use(methodOverride('_method'))

// Allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: null }}));
app.use(cookieParser());


var app = express();

app.set('views', path.join(__dirname, 'views'));
// Set up handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: 'main-registration'
}));

app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require('node-sass-middleware')({
//   src: path.join(__dirname, 'scss/'),
//   dest: path.join(__dirname, 'public/'),
//   debug: true,
//   sourceMap: true
// }));
app.use(autoprefixer({ browsers: 'last 2 versions' }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.application_controller);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});




// Error handler
// No stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: (app.get('env') === 'development') ? err : {}
  	});
});


// our module get's exported as app.
module.exports = app;



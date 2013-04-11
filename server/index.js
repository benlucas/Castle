'use strict';
var express = require('express'),
		db = require('mongoose').connect('mongodb://localhost/castle');

var app = express();

//app.settings.env = 'production'

//setup livereload if we're in production
if(app.settings.env === 'development'){
	var livereload = require('express-livereload');
	livereload(app, {
		watchDir: __dirname + '/../',
		exts: ['js', 'ejs', 'css'],
		exclusions: ['dist', 'node_modules', 'config', 'test']
	});
}

app.configure(function(){
	app.use(express.compress());
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
});

// development only
app.configure('development', function(){
	app.use("/styles", express.static(__dirname + '/../app/styles'));
	app.use("/scripts", express.static(__dirname + '/../app/scripts'));
	app.use("/img", express.static(__dirname + '/../app/img'));
	app.set('views', __dirname + '/views');
});

// production only
app.configure('production', function(){
	app.use("/styles", express.static(__dirname + '/../dist/app/styles'));
	app.use("/scripts", express.static(__dirname + '/../dist/app/scripts'));
	app.use("/img", express.static(__dirname + '/../dist/app/img'));
	app.set('views', __dirname + '/../dist/server/views');
	app.set('json spaces', 0); //remove white space from JSON
});

require('./routes/clientViewRoutes')(app);
require('./routes/api/pub')(app);
require('./routes/api/waste')(app);
 
app.get('/', function(req, res) {
	return res.render('index', { title:'Castle'});
});

console.log("Castle server running on: http://localhost:3501/");
app.listen(3501);


// {
// 	name: "Castle Arms",
// 	slug: "castle-arms",
// 	location: "Bolsover",
// 	percent: 15
// }

// {
// 	name: "Blue Bell",
// 	slug: "blue-bell",
// 	location: "Chesterfield",
// 	percent: 15
// }

// {
// 	name: "Miners Arms",
// 	slug: "miners-arms",
// 	location: "Tickton",
// 	percent: 15
// }

// {
// 	name: "Miners Arms",
// 	slug: "miners-arms2",
// 	location: "Somewhere Else",
// 	percent: 15
// }

// {
// 	beerName: "Carlsberg",
// 	pubID: "51653df3c50c5e924e30a675",
// 	amount: 5.5,
// 	notes: "Frothy",
// 	date: ISODate("2013-04-10T01:00:00+01:00")
// }

// {
// 	beerName: "Stella",
// 	pubID: "51653df3c50c5e924e30a675",
// 	amount: 1,
// 	notes: "Bad Pint",
// 	date: ISODate("2013-04-10T01:00:00+01:00")
// }

// {
// 	beerName: "Stella",
// 	pubID: "51653df3c50c5e924e30a675",
// 	amount: 2,
// 	notes: "Thrown on floor",
// 	date: ISODate("2013-04-11T01:00:00+01:00")
// }
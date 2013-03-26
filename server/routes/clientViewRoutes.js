'use strict';

var	fs		= require('fs'),
		beer	= require("../models/beer");

module.exports = function(app){

	app.get('/view/pub/waste', function(req, res){
		beer.find(function(err, result){
			return res.render('client/pub/waste', { beer:result});	
		});
	});

	app.get('/view/:level1/:level2?', function(req, res){
		var path = req.params.level1 + (req.params.level2 === undefined ? "" : "/" + req.params.level2) + '.ejs';
		
		fs.exists(app.get('views')+'/client/'+path, function (exists) {
			return exists ? res.render('client/'+path) : res.send('fail');
		});
	});
};

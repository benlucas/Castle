'use strict';

var	fs		= require('fs');

module.exports = function(app){

	app.get('/view/pub/waste', function(req, res){
		return res.render('client/pub/waste', { beer:['Carlsberg', 'Fosters', 'Stella']});
	});

	app.get('/view/:level1/:level2?', function(req, res){
		var path = req.params.level1 + (req.params.level2 === undefined ? "" : "/" + req.params.level2) + '.ejs';
		
		fs.exists(app.get('views')+'/client/'+path, function (exists) {
			return exists ? res.render('client/'+path) : res.send('fail');
		});
	});
};

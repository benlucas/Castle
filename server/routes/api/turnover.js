'use strict';

var	fs			= require('fs'),
		moment	= require('moment'),
		ObjectId = require('mongoose').Types.ObjectId,
		turnover	= require("../../models/turnover");

module.exports = function(app){

	var objectIDCheck = new RegExp("^[0-9a-fA-F]{24}$");

	app.get('/api/turnover/:pubID', function(req, res){

		if(!objectIDCheck.test(req.params.pubID)){
			return res.json('Error - Invalid objectID');
		}

		var startWeek = moment().startOf('week');		

		if(req.query.date){
			startWeek = moment(req.query.date, 'DD/MM/YY').isValid() ? moment(req.query.date, 'DD/MM/YY').startOf('week') : startWeek;
		}

		var endWeek = startWeek.clone().endOf('week');

		turnover.find({pub: new ObjectId(req.params.pubID), date: {$gte: startWeek.toDate(), $lte: endWeek.toDate()}},
			function(err, result){
				if(err){
					res.json(err);
				}
				res.json(result);
			});

	});

	app.post('/api/turnover', function(req, res){
		var date = moment(req.body.date).startOf('day');	
		date.subtract('minutes', date.zone()); //subtract timezone difference for daylight saving

		if(req.body.date && date.isValid()){
			req.body.date = date.toDate();
		}

		var toSave = new turnover(req.body);
		toSave.save(function(err,result){
			if(err){
				res.json(err);
			}
			res.json(result);
		});
	}); 

};
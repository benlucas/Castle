'use strict';

var	fs			= require('fs'),
		moment	= require('moment'),
		ObjectId = require('mongoose').Types.ObjectId,
		waste	= require("../../models/waste");

module.exports = function(app){

	var objectIDCheck = new RegExp("^[0-9a-fA-F]{24}$");

	app.get('/api/waste/:pubID', function(req, res){

		if(!objectIDCheck.test(req.params.pubID)){
			return res.json('Error - Invalid objectID');
		}

		var date = moment().millisecond(0).seconds(0).minutes(0).hours(0);
		

		if(req.query.date){
			date = moment(req.query.date, 'DD/MM/YY').isValid() ? moment(req.query.date, 'DD/MM/YY') : date;
		}

		date.subtract('minutes', date.zone()); //subtract timezone difference for daylight saving

		waste.find({pubID: new ObjectId(req.params.pubID), date: date.toDate()},
			function(err, result){
				if(err){
					res.json(err);
				}
				res.json(result);
			});

	});

	app.post('/api/waste', function(req, res){
		var date = moment(req.body.date).millisecond(0).seconds(0).minutes(0).hours(0);
		date.subtract('minutes', date.zone()); //subtract timezone difference for daylight saving

		if(req.body.date && date.isValid()){
			req.body.date = date.toDate();
		}

		var wasteToSave = new waste(req.body);
		wasteToSave.save(function(err,result){
			if(err){
				res.json(err);
			}
			res.json(result);
		});
	}); 

};
'use strict';

var	fs			= require('fs'),
		moment	= require('moment'),
		_				= require('underscore'),
		pubs	= require("../models/pub");

module.exports = function(app){

	app.get('/api/pub', function(req, res) {
			pubs.find({},{waste:false})
			.exec(function(err, result){
				if(err) {
					return res.json("Castle ERROR: "+ err);
				}
				return res.json(result);
			});
	});

	app.get('/api/waste/:slug', function(req, res){
		var date = moment().millisecond(0).seconds(0).minutes(0).hours(0);

		if(req.query.date){
			date = moment(req.query.date, 'DD/MM/YY').isValid() ? moment(req.query.date, 'DD/MM/YY') : date;
		}

		pubs.findOne({slug: req.params.slug}, 'name location slug waste')
		.populate('waste.beer')
		.exec(function(err, result){
			if(err){
				res.json(err);
			}

			result.waste = _.filter(result.waste, function(waste){ return date.isSame(waste.date); });
			res.json(result);
		});

	});

	app.post('/api/waste', function(req, res){
		var date = moment(req.body.waste.date).millisecond(0).seconds(0).minutes(0).hours(0);

		if(req.body.waste.date && date.isValid()){
			req.body.waste.date = date.toDate();
		}

		pubs.findByIdAndUpdate(req.body._id, {
			$push: {
				'waste': req.body.waste
			}
		})
		.populate('waste.beer')
		.exec(function(err, result){
			if(err){
				return res.send("Castle ERROR: "+ err);
			}
			result.waste = _.filter(result.waste, function(waste){ return date.isSame(waste.date); });
			res.json(result);
		});
	}); 


app.get('/api/pub/:slug', function(req, res) {
		pubs.findOne({slug:req.params.slug}, 'name slug location', function(err, result){
			if(err){
				return res.send("Castle ERROR: "+ err);
			}
			return res.send(result);
		});
	});
};



//  db.pubs.aggregate(
//   {$match:   {slug: 'blue-bell'}},                    // filter parent documents
//   {$unwind:  "$waste"},                               // unwind the embedded docs for filtering
//   {$match:   {"waste.date": { "$lte": ISODate("2013-03-19T00:00:00Z"), "$gte": ISODate("2013-03-19T00:00:00Z")}}},                    // filter subdocs
//   {$group:   {_id: "$_id", waste: {$push: "$waste"}}}   // group subdocs back into array in parent doc
// );

	// Maybe useful for reports
	// app.get('/api/waste', function(req, res){
	// 		var or	= [],
	// 			date	= {$elemMatch:{date:{}}},
	// 			query	= {},
	// 			split = '';

	// 	if(req.query.pubs && req.query.pubs.indexOf(',') !== -1){
	// 		split = req.query.pubs.split(',');
	// 		for (var i = split.length - 1; i >= 0; i--) {
	// 			or.push({_id:split[i]});
	// 		}
	// 	}
	// 	else if(req.query.pubs){
	// 		or.push({_id:req.query.pubs});
	// 	}

	// 	if(req.query.beers && req.query.beers.indexOf(',') !== -1){
	// 		split = req.query.beers.split(',');
	// 		for (var i2 = split.length - 1; i2 >= 0; i2--) {
	// 			or.push({waste: {$elemMatch: {	beer:split[i2] } }});
	// 		}
	// 	}
	// 	else if(req.query.beers){
	// 		or.push({waste: {$elemMatch: {	beer:req.query.beers } }});
	// 	}

	// 	if(req.query.to && moment(req.query.to, "DD/MM/YY").isValid()){
	// 		date.$elemMatch.date.$lt = moment(req.query.to, "DD/MM/YY").toDate();
	// 	}

	// 	if(req.query.from && moment(req.query.from, "DD/MM/YY").isValid()){
	// 		date.$elemMatch.date.$gte = moment(req.query.from, "DD/MM/YY").toDate();
	// 	}

	// 	if(req.query.to || req.query.from){
	// 		query.waste = date;
	// 	}

	// 	if(or.length !== 0){
	// 		query.$or = or;
	// 	}

	// 	pubs.find(query)
	// 	.populate('waste.beer')
	// 	.exec(function(err, result){
	// 		if(err) {
	// 			return res.send("Castle ERROR: "+ err);
	// 		}
	// 		res.json(result);
	// 	});
		
	// });

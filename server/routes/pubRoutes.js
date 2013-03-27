'use strict';

var	fs			= require('fs'),
		moment	= require('moment'),
		_				= require('underscore'),
		//crossfilter	= require('crossfilter'),
		pubs	= require("../models/pub");

module.exports = function(app){

	app.get('/api/pub', function(req, res) {
			pubs.find({},{waste:0})
			.exec(function(err, result){
				if(err) {
					return res.json("Castle ERROR: "+ err);
				}
				return res.json(result);
			});
	});

	//TODO: Gets slow after about 5k waste documents
	app.get('/api/waste/:slug', function(req, res){


		// for (var i = 500 - 1; i >= 0; i--) {
		// 	pubs.findOneAndUpdate({slug:'blue-bell'}, {
		// 		$push:{
		// 			waste:{
		// 	      "date": "2013-03-17T00:00:00.000Z",
		// 	      "beer": "5141cd753275f142157757d4",
		// 	      "waste": 3,
		// 	      "notes": "Yep"
		// 	    }
		// 		}
		// 	}, function(){
		// 		console.log("done");
		// 		return;
		// 	})
		// };
		// res.send("done");
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

			// var records = crossfilter(result.waste);
			// var dateDimention = records.dimension(function(d){ return d.date });
			// var filter = dateDimention.filter(today.toDate());
			// console.log(records);
			// console.log(dateDimention);
			// console.log(filter.top(100));
			// result.waste = filter.top(5);

			result.waste = _.filter(result.waste, function(waste){ return date.isSame(waste.date); });
			res.json(result);
		});
		// pubs.aggregate(
		// 	{$match:   {slug: req.params.slug}},
		// 	{$unwind:  "$waste"},
		// 	{$match:   {"waste.date": { "$gte": today.toDate(),$lt: moment(today).add('days', 1).toDate()}}},
		// 	{$group:   {_id: "$_id", waste: {$push: "$waste"}}},
		// 	function(err, result){
		// 		if(err)res.json(err);
		// 		res.json(result);
		// 	}
		// );

	});

	app.get('/api/waste', function(req, res){
			var or	= [],
				date	= {$elemMatch:{date:{}}},
				query	= {};


		// {
		// 	$or:[
		// 			{_id:'castle-arms'},
		// 			{_id:'blue-bell'},
		// 			{
		// 				waste:{
		// 					$elemMatch: {
		// 						beer:'45tgf'
		// 					}
		// 				}
		// 			},
		// 			{
		// 				waste:{
		// 					$elemMatch: {
		// 						beer:'45tgf'
		// 					}
		// 				}
		// 			}
		// 		],
		// 	waste:{
		// 		$elemMatch:{
		// 			date: {$lt:0, $gt:0}
		// 		}
		// 	}
		// }
		var split = '';
		if(req.query.pubs && req.query.pubs.indexOf(',') !== -1){
			split = req.query.pubs.split(',');
			for (var i = split.length - 1; i >= 0; i--) {
				or.push({_id:split[i]});
			}
		}
		else if(req.query.pubs){
			or.push({_id:req.query.pubs});
		}

		if(req.query.beers && req.query.beers.indexOf(',') !== -1){
			split = req.query.beers.split(',');
			for (var i2 = split.length - 1; i2 >= 0; i2--) {
				or.push({waste: {$elemMatch: {	beer:split[i2] } }});
			}
		}
		else if(req.query.beers){
			or.push({waste: {$elemMatch: {	beer:req.query.beers } }});
		}

		if(req.query.to && moment(req.query.to, "DD/MM/YY").isValid()){
			date.$elemMatch.date.$lt = moment(req.query.to, "DD/MM/YY").toDate();
		}

		if(req.query.from && moment(req.query.from, "DD/MM/YY").isValid()){
			date.$elemMatch.date.$gte = moment(req.query.from, "DD/MM/YY").toDate();
		}

		if(req.query.to || req.query.from){
			query.waste = date;
		}

		if(or.length !== 0){
			query.$or = or;
		}

		console.log(JSON.stringify(query, null, 4));

		pubs.find(query)
		.populate('waste.beer')
		.exec(function(err, result){
			if(err) {
				return res.send("Castle ERROR: "+ err);
			}
			console.log(JSON.stringify(result, null, 4));
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

		// var query = {slug:req.params.slug};
		// if(req.query["waste"]){
		// 	//beerType
		// 	//To
		// 	//From
		// 	//pubs
		// }

		pubs.findOne({slug:req.params.slug}, 'name slug location', function(err, result){
			if(err){
				return res.send("Castle ERROR: "+ err);
			}
			return res.send(result);
		});
	});
};


	// db.pubs.find(
	// 	{
	// 		slug:'castle-arms',
	// 		waste: {
	// 			$elemMatch: {
	// 				person:'Ben'
	// 			}
	// 		}
	// 	}
	// )


	//db.pubs.find({slug:'castle-arms', waste: { $elemMatch: {beer:ObjectId('5141cd753275f142157757d4')}}}

	// {
	//   "_id": "514109b754a046d11b7b5689",
	//   "slug": "blue-bell",
	//   "name": "Blue Bell",
	//   "location": "Chesterfield",
	//   "waste": []
	// },
	// {
	//   "__v": 1,
	//   "_id": "514109df54a046d11b7b568a",
	//   "location": "Bolsover",
	//   "name": "Castle Arms",
	//   "slug": "castle-arms",
	//   "waste": [
	//     {
	//       "beer": {
	//         "_id": "5141cd753275f142157757d4",
	//         "slug": "carlsberg",
	//         "name": "Carlsberg"
	//       },
	//       "person": "Ben",
	//       "waste": 5,
	//       "notes": "Some notes. Probably a line clean.",
	//       "_id": "5141d7058e0e24833c000002"
	//     }
	//   ]
	// }


	// {
	//   "location": "Bolsover",
	//   "name": "Castle Arms",
	//   "slug": "castle-arms",
	//   "waste": []
	// }


	// {
 //    "waste": {
 //        "$elemMatch": {
 //            "date": {
 //                "$lt": ISODate("2013-03-18T00:00:00.000Z"),
 //                "$gt": ISODate("2013-03-17T00:00:00.000Z")
 //            }
 //        }
 //    },
 //    "$or": [
 //        {
 //            "_id": ObjectId("514109b754a046d11b7b5689")
 //        }
 //    ]
 //  }

 // app.get('/api/waste/:pubID', function(req, res) {
// 		waste.find({person: "Ben"})
// 		.populate('beer')
// 		.exec(function(err, result){
// 			if(err) return res.send("Castle ERROR: "+ err);
// 			return res.send(result);
// 		})
// });

// var was = {
// 	beer: "5141cd753275f142157757d4",
// 	person: "Ben",
// 	waste: 5,
// 	notes: "Some notes. Probably a line clean."
// };

// was.save(function(err){
// 	console.log(err);
// });

// pubs.findOne({slug:"castle-arms"},function(err, result){
// 	for (var i = 3000 - 1; i >= 0; i--) {
// 		result.waste.push(was);
// 	};	
// 	result.save(function(err,result){
// 		console.log(err);
// 	});
// })



//  db.pubs.aggregate(
//   {$match:   {slug: 'blue-bell'}},                    // filter parent documents
//   {$unwind:  "$waste"},                               // unwind the embedded docs for filtering
//   {$match:   {"waste.date": { "$lte": ISODate("2013-03-19T00:00:00Z"), "$gte": ISODate("2013-03-19T00:00:00Z")}}},                    // filter subdocs
//   {$group:   {_id: "$_id", waste: {$push: "$waste"}}}   // group subdocs back into array in parent doc
// );

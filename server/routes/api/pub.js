'use strict';

var	fs			= require('fs'),
		ObjectId = require('mongoose').Types.ObjectId,
		pubs	= require("../../models/pub");

module.exports = function(app){
	var objectIDCheck = new RegExp("^[0-9a-fA-F]{24}$");

	app.get('/api/pub', function(req, res) {
		if(!objectIDCheck.test(req.query._id )){
			return res.json('Invalid ID');
		}

		pubs.findOne({_id: new ObjectId(req.query._id)},
			function(err, result){
			if(err) {
				return res.json("Castle ERROR: "+ err);
			}
			return res.json(result);
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
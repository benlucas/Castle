'use strict';

var	fs			= require('fs'),
		ObjectId = require('mongoose').Types.ObjectId,
		pubs	= require("../../models/pub");

module.exports = function(app){
	var objectIDCheck = new RegExp("^[0-9a-fA-F]{24}$");

	app.get('/api/pub', function(req, res) {
		pubs.find(
			function(err, result){
			if(err) {
				return res.json("Castle ERROR: "+ err);
			}
			return res.json(result);
		});
	});


app.get('/api/pub/:id', function(req, res) {
		if(!objectIDCheck.test(req.params.id )){
			return res.json('Invalid ID');
		}
		pubs.findOne({_id:req.params.id}, function(err, result){
			if(err){
				return res.json("Castle ERROR: "+ err);
			}
			return res.json(result);
		});
	});
};
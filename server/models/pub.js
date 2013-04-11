var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

pubSchema = new Schema({
	name: String,
	location: String,
	slug: String,
	percent: Number
});

module.exports = mongoose.model('pub', pubSchema, 'pubs');


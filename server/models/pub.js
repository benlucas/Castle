var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

pubSchema = new Schema({
	name: String,
	location: String,
	slug: String,
	waste: [new Schema({
		beer: { type: Schema.Types.ObjectId, ref: 'Beer' },
		person: String,
		date: Date,
		waste: Number,
		notes: String
	})]
});

module.exports = mongoose.model('pub', pubSchema, 'pubs');

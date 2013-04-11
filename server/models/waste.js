var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

wasteSchema = new Schema({
	pubID : Schema.Types.ObjectId,
	beerName: String,
	amount: Number,
	notes: String,
	date: Date
});

module.exports = mongoose.model('Waste', wasteSchema, 'waste'); 
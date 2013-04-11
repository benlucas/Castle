var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

turnoverSchema = new Schema({
	pub : { type: Schema.Types.ObjectId, ref: 'Pub' },
	amount: Number,
	date: Date
});

module.exports = mongoose.model('Turnover', turnoverSchema, 'turnover'); 
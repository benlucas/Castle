var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

expensesSchema = new Schema({
	pub : { type: Schema.Types.ObjectId, ref: 'Pub' },
	description: String,
	date: Date,
	vat: Boolean
});

module.exports = mongoose.model('Expenses', expensesSchema, 'expenses');


var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

beerSchema = new Schema({
	slug: String,
	name: String
});

module.exports = mongoose.model('Beer', beerSchema, 'beer'); 
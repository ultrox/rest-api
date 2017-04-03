var mongoose = require('mongoose');
mongoose.Promise = Promise;
var commentsSchema = require('./comments');

var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var disheSchema = new Schema({
	name: {type: String, required: true, unque: true},
	price: {type: Currency, required: true},
	description: {type: String, required: true},
	label: {type: String, default: ''},
	category: {type: String, required: true},
	image: {type: String},
	comments: [commentsSchema]
	// comments: []
}, {timestamps: true});

module.exports = mongoose.model('dish', disheSchema);

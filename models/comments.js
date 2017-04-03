var mongoose = require('mongoose');
mongoose.Promise = Promise;

var Schema = mongoose.Schema;

var commentsSchema = new Schema({
	rating: {type: Number, min: 1, max: 5},
	author: {type: String, required: true},
	content: {type: String, required: true}
}, {timestamps: true})

// var Comments = mongoose.model('comment', commentsSchema);
// module.exports = Comments;
module.exports = commentsSchema;



var mongoose = require('mongoose');

/* Gender Schema */

var genderSchema = mongoose.Schema({
	name : { type : String },
	type : { type : String }
});

/* Gender Validation */

ArticleSchema.path('name').required(true, 'name is required');
ArticleSchema.path('type').required(true, 'type is required');

mongoose.model('Gender', genderSchema);
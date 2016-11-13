var mongoose = require('mongoose');

/* Gender Schema */

var GenderSchema = mongoose.Schema({
	name : { type : String },
	type : { type : String }
});

/* Gender Validation */

GenderSchema.path('name').required(true, 'name is required');
GenderSchema.path('type').required(true, 'type is required');

var Gender = mongoose.model('Gender', GenderSchema, "Gender");

module.exports = Gender;
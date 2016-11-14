var mongoose = require('mongoose');

/* Name Schema */

var NameSchema = mongoose.Schema({
	name : { type : String }
});

/* Name Validation */

NameSchema.path('name').required(true, 'name is required');


/* Name Methods */

NameSchema.methods.saveIfNotExist = function () {
	that = this;
	that.name = that.name.toLowerCase();
	return that.model('Name').findOne({ name : that.name }, function(err, result) {
		if (!result) {
			that.save(function(err, result){});
		}
	});
}


var Name = mongoose.model('Name', NameSchema, 'Name');

module.exports = Name;
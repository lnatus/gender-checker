var mongoose = require('mongoose');
var subscription = require('../config/subscription')

/* Account Schema */

var accountSchema = mongoose.Schema({
	apiKey : { type : String },
	firstName : { type : String},
	lastName : { type : String},
	isActive : { type : Boolean, default : true},
	createdAt : { type: Date, default : Date.now},
	requestCount : { type: Number, default: 0}
	subscription: { type: String, default : 'trial' lowercase : true}
});

/* Account Validation */

ArticleSchema.path('apiKey').required(true, 'apiKey is required');
ArticleSchema.path('firstName').required(true, 'firstName is required');
ArticleSchema.path('lastName').required(true, 'lastName is required');

/* Account Methods */

accountSchema.methods.isDailyLimitExceeded = function () {
	return subscription[this.subscription] < this.requestCount;
}

accountSchema.methods.incRequestCount = function () {
	this.requestCount++;
}

accountSchema.methods.resetRequestCount = function () {
	this.requestCount = 0;
}

mongoose.model('Account', accountSchema);
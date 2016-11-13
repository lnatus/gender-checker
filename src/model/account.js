var mongoose = require('mongoose');
var subscription = require('../config/subscription');

/* Account Schema */

var AccountSchema = mongoose.Schema({
	apiKey : { type : String },
	firstName : { type : String},
	lastName : { type : String},
	isActive : { type : Boolean, default : true},
	createdAt : { type: Date, default : Date.now},
	requestCount : { type: Number, default: 0},
	subscription: { type: String, default : 'trial', lowercase : true}
});

/* Account Validation */

AccountSchema.path('apiKey').required(true, 'apiKey is required');
AccountSchema.path('firstName').required(true, 'firstName is required');
AccountSchema.path('lastName').required(true, 'lastName is required');

/* Account Methods */

AccountSchema.methods.isDailyLimitExceeded = function () {
	return subscription[this.subscription] < this.requestCount;
}

AccountSchema.methods.incRequestCount = function () {
	this.requestCount++;
}

AccountSchema.methods.resetRequestCount = function () {
	this.requestCount = 0;
}

var Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
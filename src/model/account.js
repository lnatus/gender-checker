var mongoose = require('mongoose');
var subscription = require('../config/subscription');

/* Account Schema */

var AccountSchema = mongoose.Schema({
	apiKey : { type : String },
	isActive : { type : Boolean, default : true },
	createdAt : { type: Date, default : Date.now },
	requestCount : { type: Number, default: 0 },
	subscription: { type: String, default : 'trial', lowercase : true },
	month: { type: Number, default: new Date().getMonth() }
});

/* Account Validation */

AccountSchema.path('apiKey').required(true, 'apiKey is required');

/* Account Methods */

AccountSchema.methods.findByApiKey = function (apiKey, next) {
	return this.model('Account').findOne({ apiKey : apiKey }, next);
}

AccountSchema.methods.isMonthlyLimitExceeded = function () {
	var month = new Date().getMonth();
	if (month === this.month) {
		return subscription[this.subscription] < this.requestCount;
	} else {
		this.month = month;
		this.requestCount = 0;
		this.save();
		return false;
	} 
}

AccountSchema.methods.incRequestCount = function () {
	this.requestCount++;
}

AccountSchema.methods.resetRequestCount = function () {
	this.requestCount = 0;
}

var Account = mongoose.model('Account', AccountSchema, 'Account');

module.exports = Account;
var mongoose = require('mongoose');
var subscription = require('../config/subscription');

/* Account Schema */

var AccountSchema = mongoose.Schema({
	apiKey : { type : String },
	requestCount : { type : Number, default: 0 },
	subscription: { type : String, default : 'trial', lowercase : true },
	duration : { type : Number, default : 3 },
	expireDate : { type: Date, default: null },
	month : { type : Number, default: -1 }
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

AccountSchema.methods.isApiKeyExpired = function () {
	if (!this.expireDate) {
		var date = new Date()
		this.month = date.getMonth();
		date.setMonth(date.getMonth() + this.duration)
		this.expireDate = date;
		this.save();
		return false;
	} else {
		return Date.now() > this.expireDate;
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
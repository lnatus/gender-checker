var mongoose = require('mongoose');
var subscription = require('../config/subscription');

/* Account Schema */

var AccountSchema = mongoose.Schema({
	apiKey : { type : String },
	requestCount : { type : Number, default: 0 },
	subscription: { type : String, default : 'trial', lowercase : true },
	isUsed: { type: Boolean, default: false },
	isExpired: { type: Boolean, default: false },
	month : { type : Number, default: -1 }
});

/* Account Validation */

AccountSchema.path('apiKey').required(true, 'apiKey is required');

/* Private Helper */

var isOneTimeLimitExceeded = function (acc) {
	 if(subscription.limit[acc.subscription] < acc.requestCount) {
		 acc.isExpired = true;
		 acc.save();
		 return true;
	}
	else {
		return false;
	}
}

var isMonthlyLimitExceeded = function (acc) {
	var month = new Date().getMonth();
		if (month === acc.month) {
			return subscription.limit[acc.subscription] < acc.requestCount;
		} 
		else {
			acc.month = month;
			acc.requestCount = 0;
			acc.save();
			return false;
		} 
}

var isOneTimeSubscription = function (acc) {
	return acc.subscription === 'oneTest'    || 
				 acc.subscription === 'oneTrial'   ||
				 acc.subscription === 'oneBasic'   || 
				 acc.subscription === 'onePremium' || 
				 acc.subscription === 'oneUltimate';
}

/* Account Methods */

AccountSchema.methods.findByApiKey = function (apiKey, next) {
	return this.model('Account').findOne({ apiKey : apiKey },  function(err, result) {
		if(!err && result && !result.isUsed){
			result.isUsed = true;
			result.save();
		}
		next(err, result);
	});
}

AccountSchema.methods.isRequestLimitExceeded = function () {
	return isOneTimeSubscription(this) ? isOneTimeLimitExceeded(this) : isMonthlyLimitExceeded(this);
}

AccountSchema.methods.incRequestCount = function () {
	this.requestCount++;
}

AccountSchema.methods.resetRequestCount = function () {
	this.requestCount = 0;
}

var Account = mongoose.model('Account', AccountSchema, 'Account');

module.exports = Account;

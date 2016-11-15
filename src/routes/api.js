var validator = require('validator');
var error = require('../config/error');
var Gender = require('../model/gender');
var Account = require('../model/account');
var Name = require('../model/name');

var getRequestState = function (apiKey, name) {
	var state = { code : 0 };

	if (!apiKey) {
		return error.apiKeyMissing;
	}

	if(!validator.isUUID(apiKey)){
		return error.apiKeyInvalid;
	}

	if (!name) {
		return error.nameMissing;
	}

	return state;
}

var getAccountState = function (apiKey, next) {
	var state = { code : 0 };

	var account = new Account();
	account.findByApiKey(apiKey, function (err, result) {
		if (err) {
			return next(error.api);
		}

		if (!result) {
			return next(error.apiKeySubscription);
		}

		if (result.isApiKeyExpired()) {
			return next(error.apiSubscriptionExpired)
		}

		if(result.isMonthlyLimitExceeded()) {
			return next(error.monthlyLimitExceeded);
		}

		next(state, result);
	});
}

exports.read = function (req, res) {
	var apiKey = req.query.apiKey;
	var name = req.query.name;
	var reqState = getRequestState(apiKey, name);

	if (reqState.code !== 0) {
		return res.send(reqState);
	} 

	getAccountState(apiKey, function(accState, accResult) {
		if (accResult) {
			var gender = new Gender();
			gender.findByName(name, function (err, result) {

				if(err) {
					return res.send(error.api);
				}

				accResult.incRequestCount();
				accResult.save();

				if (!result) {
					var missingName = new Name( { name : name });
					missingName.saveIfNotExist();
					return res.send({ name : name, gender: null })
				}

				res.send(result);
			});	
		} else {
			res.send(accState);
		}
	});
}

exports.notFound = function (req, res) {
	res.status(404)        
   		.send(error.notFound);
}

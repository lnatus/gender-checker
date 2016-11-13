var validator = require('validator');
var error = require('../config/error');
var Gender = require('../model/Gender');
var Account = require('../model/Account');

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

		if(result.isDailyLimitExceeded()) {
			return next(error.dailyLimitExceeded);
		}

		next(state, result);
	});
}

exports.read = function (req, res) {
	var apiKey = req.query.apiKey;
	var name = req.query.name;
	var reqState = getRequestState(apiKey, name);

	if (reqState.code !== 0) {
		res.send(reqState);
	} 

	getAccountState(apiKey, function(accState, result) {
		// TODO: Handle State; 
		// TODO: Inc requestCount on result
		console.log(accState);
	});

	var gender = new Gender();
	gender.findByName(name, function (err, result) {

		if(err) {
			return res.send(error.api);
		}

		if (!result) {
			// TODO: Save name to missing name collection
			return res.send({ name : name, gender: null })
		}

		res.send(result);
	});
}

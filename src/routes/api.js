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

		if (result.isExpired) {
			return next(error.apiSubscriptionExpired)
		}

		if(result.isRequestLimitExceeded()) {
			return next(error.monthlyLimitExceeded);
		}

		next(state, result);
	});
}

var sendResponse = function (res, state, payload, callback) {
	if(callback) {
		res.status(state).jsonp(payload);
	} else {
		res.status(state).send(payload);
	}
}

exports.read = function (req, res) {
	var apiKey = req.query.apiKey;
	var name = req.query.name;
	var callback = req.query.callback;

	var reqState = getRequestState(apiKey, name);

	if (reqState.code !== 0) {
		return sendResponse(res, reqState.code, reqState, callback);
	} 

	getAccountState(apiKey, function(accState, accResult) {
		if (accResult) {
			var gender = new Gender();
			gender.findByName(name, function (err, result) {

				if(err) {
					return sendResponse(res, error.api.code, error.api, callback);
				}

				accResult.incRequestCount();
				accResult.save();

				if (!result) {
					var missingName = new Name( { name : name });
					missingName.saveIfNotExist();
					var emptyGender = { name : name, gender: null };
					return sendResponse(res, 200, emptyGender, callback);
				}

				sendResponse(res, 200, result, callback);
			});	
		} else {
			sendResponse(res, accState.code, accState, callback);
		}
	});
}


exports.notFound = function (req, res) {
	var callback = req.query.callback;
	sendResponse(res, 404, error.notFound, callback);
}

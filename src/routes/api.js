var validator = require('validator');
var error = require('../config/error')


var getRequestState = function (req) {
	var state = { code : 0, error: null };
	var apiKey = req.query.apiKey;
	var name = req.query.name;

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


exports.read = function (req, res) {

	var state = getRequestState(req);

	if (state.code !== 0) {
		res.send(state);
	}


	res.send('Welcome to gender checker...');
}

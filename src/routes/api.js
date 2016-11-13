var validator = require('validator');
var error = require('../config/error');
var Gender = require('../model/Gender');

var getRequestState = function (apiKey, name) {
	var state = { code : 0, error: null };

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
	var apiKey = req.query.apiKey;
	var name = req.query.name;
	var state = getRequestState(apiKey, name);

	if (state.code !== 0) {
		res.send(state);
	} 

	// TODO: Validate apiKey and check daily request limit.
	Gender.findOne({ 'name' : name.toUpperCase() }, '-_id name gender', function (err, result) {
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

var error = {
	api : { code : 1, error : 'Gender API Error. Please try again or report that issue at contact [at] gender-checker.com'},
	apiKeyMissing : { code : 100, error : 'apiKey parameter not found' },
	apiKeyInvalid : { code : 101, error : 'apiKey parmater is invalid'},
	apiKeySubscription: { code : 102, error : 'Could not find subscription for this apiKey.'},
	apiSubscriptionExpired: { code: 103, error : 'Subscription for this apiKey is expired.'},
	nameMissing : { code : 200, error : 'name parameter not found' },
	monthlyLimitExceeded : { code : 300, error : 'Monthly request limit exceeded.'},
	notFound: { code : 404, error : 'Wrong request. This route can not be found.' }
}

module.exports = error;
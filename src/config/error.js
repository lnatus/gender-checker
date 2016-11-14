var error = {
	api : { code : 1, error : 'Gender API Error. Please try again or report that issue at contact [at] gender-checker.com'},
	apiKeyMissing : { code : 100, error : 'apiKey parameter not found' },
	apiKeyInvalid : { code : 101, error : 'apiKey parmater is invalid'},
	apiKeySubscription: { code : 102, error : 'Could not find subscription for this apiKey.'},
	apiSubscriptionNotActive: { code: 103, error : 'Subscription for this apiKey is not active.'},
	nameMissing : { code : 200, error : 'name parameter not found' },
	dailyLimitExceeded : { code : 300, error : 'Daily request limit exceeded.'}
}

module.exports = error;
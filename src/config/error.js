var error = {
	api : { code : 500, error : 'Internal Server Error', message:'Please try again or report that issue at contact [at] gender-checker.com'},
	apiKeyMissing : { code : 400, error : 'Bad Request', message:'Parameter apiKey not found' },
	apiKeyInvalid : { code : 401, error : 'Unauthorized', message:'Parameter apiKey is invalid'},
	apiKeySubscription: { code : 401, error : 'Unauthorized', message:'No subscription for this apiKey'},
	apiSubscriptionExpired: { code: 402, error : 'Payment Required', message:'Subscription for this apiKey is expired'},
	nameMissing : { code : 400, error : 'Bad Request', message:'Parameter name not found' },
	monthlyLimitExceeded : { code : 429, error : 'Too Many Requests', message:'Monthly request limit exceeded'},
	notFound: { code : 404, error : 'Not Found', message:'This route can not be found' }
}

module.exports = error;

var env = {
	mode: "dev",
	dev: {
		mongoDBConnection: "mongodb://localhost/gcdb",
		httpPort: 3000,
	 	httpsPort: 8000
	},
	prod: {
		mongoDBConnection: "mongodb://gc_mongoadmin:boo6XoaSha@localhost:21199/admin",
		httpPort: 61000,
		httpsPort: 61001
	}
}

module.exports = env;
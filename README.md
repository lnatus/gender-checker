# gender-checker

Gender Checker API

## API Usage

### Sample request

`http:\\gender-checker.com\api?apiKey=B567228F-56C0-416D-BE1A-44820CFBEF22&name=Max`

	* apiKey (Required)
	* name (Required)

### Sample response

`{ name : "Max", gender : "m"}`

## Error Codes

### Error response

`{ "code" : 100, "error" : "apiKey parameter not found" }`

### General Error Codes

	*	1 Unkown API Error
	* 404 Route not found

### API Key Error Codes

	*	100 apiKey parameter not found
	*	101	apiKey is invalid
	*	102 Could not find subscription for this apiKey
	*	103 Subcription for this apiKey is expired

### Name Error Codes

	* 200 name parameter not found

### Limit Error Codes

	* 300 Monthly request limit exceeded

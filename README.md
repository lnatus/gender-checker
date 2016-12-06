# gender-checker

Gender Checker API

## API Usage

### Sample request

`http:\\gender-checker.com\api?apiKey=B567228F-56C0-416D-BE1A-44820CFBEF22&name=Max`

	* apiKey (Required)
	* name (Required)

### Sample response

#### Male

`{ name : "Max", gender : "m"}`

#### Female

'{ name : "Lisa", gender : "f"}`

#### Name not found 

`{name : "RarelyName", gender: null}`

## Error Codes

### Error response

`{ code : 401, error : 'Unauthorized', message:'Parameter apiKey is invalid'}`

### General Error Codes

	*	500 Internal Server Error
	* 400 Bad Request
  * 404 Not Found

### API Key Error Codes

	*	401 Unauthorized (Parameter apiKey not found or invalid)
	*	402 Payment Required (Subscription for this apiKey is expired)
  * 429 Too Many Requests (Monthly request limit exceeded)


  ### JSONP

  ```
  <!DOCTYPE html>
  <html>
    <head>
      <script
      src="https://code.jquery.com/jquery-2.2.4.js"
      integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
      crossorigin="anonymous"></script>
      <script type="text/javascript">
      (function(){
        window.myCallbackFunc =  function(json){
          $("#jsonp-response").text(JSON.stringify(json));
        }
        $.ajax({
          url: "http://localhost:3000/?apiKey=D3F6AC8F-883B-415A-872B-2109F25EBAAD&name=Jessica",
          dataType: "jsonp",
          jsonpCallback: "myCallbackFunc"
        });
      })();
    </script>
      <meta charset="UTF-8">
      <title>JSONP Test</title>
    </head>
    <body>
      <div id="jsonp-response">
      </div>
    </body>
  </html>
  ```

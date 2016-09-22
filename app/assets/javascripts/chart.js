$(document).ready(function() {
	getData();
});

var getData = function() {
  console.log("Inside getData function")
  
    var urlVariable = '/measurements';
    var method = 'GET';

    var request = $.ajax({
      url: urlVariable,
      method: method
    });

    // Get the data from '/measurements' url
    request.done(function(responseData, status, jqXHR ) {
      console.log("getFields: " + status);
      console.log("jqXHR: " + jqXHR);
    });

    request.fail(function(responseData) {
      console.log("getFields AJAX call failed");
    });
}; 
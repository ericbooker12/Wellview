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
    createChart(responseData);
  });

  request.fail(function(responseData) {
    console.log("getFields AJAX call failed");
  }); 
}; 

// -------------------------------------------------------

var createChart = function(data) {
  JSON.stringify(data);
  // console.log(data);

  var h = 360;
  var w = 800;
  var margin = 40;

  // Set the canvas
  var svg = d3.select("#chart_container")
    .append("svg")
    .attr({
      "id": "display",
      "width": w,
      "height": h
    })
    .style('background-color', 'BlanchedAlmond');

    // get range, min and max depth
    var extent = d3.extent(data, function(d){
      return d.depth;
    })

    var minDepth = extent[0];
    var maxDepth = extent[1];
    
    console.log(extent);
    console.log(minDepth);
    console.log(maxDepth);

    

};








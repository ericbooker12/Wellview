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

  var height = 2000;
  var width = 800;
  var margin = 40;
  var ch = 2000;

  // get range, min and max depth
  var extent = d3.extent(data, function(d){
    return d.depth;
  })

  var minDepth = extent[0];
  var maxDepth = extent[1];

  // Set the ranges
  var x = d3.scale.linear().range([margin, width - margin]);
  var y = d3.scale.linear().range([height - margin, margin]);

  // Define the line
  var line = d3.svg.line()
    .x(function(d, i) { return x(d.temp_out); })
    .y(function(d, i) { return y(d.depth);    })
    .interpolate("basis")

  // Define the canvas
  var svg = d3.select("#chart_container")
    .append("svg")
      .attr("width", width )
      .attr("height", height )
      .style('background-color', 'BlanchedAlmond')
    .append("g");
           
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.temp_out;}))
    y.domain([d3.max(data, function(d) {return d.depth; }), margin])
    
    // Add the line path
    svg.append("path")
        .attr("class", "line")
        .attr("d", line(data))
        .style({
          fill: "none",
          stroke: "#0000ff"
        });

     // Define the axes
    var xAxis = d3.svg.axis().scale(x)
      .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
      .orient("right").ticks(10)
    
    // Add the X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(margin, 1800)")
      .call(xAxis);

    // Add the y-axis
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(margin,margin)")
      .call(yAxis);
  };








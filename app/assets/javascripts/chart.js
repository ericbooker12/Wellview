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
    data = responseData
    // console.log(responseData[0]);
    prepData(responseData);
  });

  request.fail(function(responseData) {
    console.log("getFields AJAX call failed");
  }); 
}; 

// -------------------------------------------------------

var ch = 864;
var prepData = function(data) {
  console.log(data);

  var column1 = {
    lineData: "tempIn",
    offset: 0,
    width: 100,
    height: 864,
    color: "#0000ff",
    stroke: 1,
    fill: "none",
    header: "Temperature In"
  };
  
  createChart(data, 0, column1)
}

var createChart = function(data, xPos, colData) {
  JSON.stringify(data);
  var depthCol = 50;

  console.log(colData)

  // get domain, min and max depth
  var extent = d3.extent(data, function(d){
    return d.depth;
  });

  // get domain, min and max depth
  var dataExtent = d3.extent(data, function(d){
    return d.temp_out;
  });

  // Set up the globals
  var margin = {top: 30, right:40, bottom: 30, left: 50};
  var width = colData.width; //400 - margin.left - margin.right;
  var height = colData.height - margin.top - margin.bottom;

  var minDepth = extent[0];
  var maxDepth = extent[1];

  // Set the ranges
  var tempOutMax = d3.max(data, function(d){return d.temp_out})
  console.log("temp max = " , tempOutMax)
  var x = d3.scale.linear().domain(dataExtent).range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  // Define the axes
  var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(10);

  var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(10)

  // Define the lines
  switch (colData.lineData) {
  case "tempOut":
      console.log("Plotting Temp-Out data")
      var lineData = d3.svg.line()
        .x(function(d) { return x(d.temp_out); })
        .y(function(d) { return y(d.depth);    })
        .interpolate("basis")
      break;

  case "tempIn":
    console.log("Plotting Temp-In data")
      var lineData = d3.svg.line()
        .x(function(d) { return x(d.temp_in); })
        .y(function(d) { return y(d.depth);    })
        .interpolate("basis")
      break;
  }

  var press = d3.svg.line()
    .x(function(d) { return x(d.pressure); })
    .y(function(d) { return y(d.depth);    })
    .interpolate("basis")

  var rop = d3.svg.line()
    .x(function(d) { return x(d.rop); })
    .y(function(d) { return y(d.depth);    })
    .interpolate("basis")

  var wob = d3.svg.line()
    .x(function(d) { return x(d.wob); })
    .y(function(d) { return y(d.depth);    })
    .interpolate("basis")

  // Add the depth scale
  var svgDepth = d3.select("#chart_container")
    .append("svg")
      .attr("width", depthCol)
      .attr("height", height + margin.top + margin.bottom )
      .attr("transform", "translate(" + colData.offset + ", 0)")
      .style('background-color', '#ffffff')
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
  // Add the canvas
  var svg = d3.select("#chart_container")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom )
      .attr("transform", "translate(" + depthCol + ", 0)")
      .style('background-color', 'BlanchedAlmond')
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
           
    // Scale the range of the data
    // x.domain(d3.extent(data, function(d) {  return d.temp_out;}))
    x.domain([0, 400])
    y.domain([d3.max(data, function(d) {  return d.depth; }), 0])
    
    // Add the line path
    svg.append("path")
        .attr("class", "line")
        .attr("d", lineData(data))
        .style({
          fill: colData.fill,
          stroke: colData.color,
        });
   
    // Add the x-axis
    svg.append("g")
      .attr("class", "axis")
      .attr("fill", 1)
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxis);

    
    // Add the y-axis
    svgDepth.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(10, 0)")
      .call(yAxis);

  // Add text
    svg.append("text")
        .attr("transform", "translate(0, 10)")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(colData.header);

};











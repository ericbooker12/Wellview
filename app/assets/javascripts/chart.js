$(document).ready(function() {

   var depthCol = d3.select("#chart_container")
    .append("svg")
      .attr('id', 'depthCol')
      .attr("width", 92)
      .attr("height", 864)
      .attr("transform", "translate(192, 0)")
      .style('background-color', "#f9f9e0")

  var lithCol = d3.select("#chart_container")
    .append("svg")
      .attr('id', 'lithCol')
      .attr("width", 92)
      .attr("height", 864)
      .attr("transform", "translate(92, 0)")
      .style('background-color', "#f9f9e0")

	var minCol = d3.select("#chart_container")
    .append("svg")
      .attr('id', 'minCol')
      .attr("width", 160)
      .attr("height", 864)
      .attr("transform", "translate(184, 0)")
      .style('background-color', "#f9f9e0")

  var symCol = d3.select("#chart_container")
    .append("svg")
      .attr('id', 'symCol')
      .attr("width", 18)
      .attr("height", 864)
      .attr("transform", "translate(202, 0)")
      .style('background-color', "#f9f9e0")

  var descCol = d3.select("#chart_container")
    .append("svg")
      .attr('id', 'descCol')
      .attr("width", 200)
      .attr("height", 864)
      .attr("transform", "translate(402, 0)")
      .style('background-color', "#f9f9e0")

  var dataCol = d3.select("#chart_container")
    .append("svg")
      .attr('id', 'depthCol')
      .attr("width", 240)
      .attr("height", 864)
      .attr("transform", "translate(642, 0)")
      .style('background-color', "#f9f9e0")

  d3.json("/measurements", prepData);
  
});

var prepData = function(data) {

  // This should be an array of objects or nested objects
  var column0 = {
    lineData: "depth",
    offset: 0,
    width: 24,
    height: 864,
    color: "#0000ff",
    stroke: 1,
    fill: "none",
    header: "",
    background: "LemonChiffon",
    xNumOfTicks: 4,
    yNumOfTicks: 10, 
    xScale: false,
    yScale: true
  };

  var column1 = {
    lineData: "tempOut",
    offset: 24,
    width: 192,
    height: 864,
    // color: "#c2232B",
    color: "#2b5a87",
    stroke: 1,
    fill: 'none',
    header: "ROP",
    background: "#f4f4c7",
    xNumOfTicks: 4,
    yNumOfTicks: 10, 
    xScale: true,
    yScale: false,
    scaleRange: 400
  };

   var column2 = {
    lineData: "tempIn",
    offset: 24,
    width: 96,
    height: 864,
    color: "#0000ff",
    stroke: 1,
    fill: "none",
    header: "ROP",
    background: "LightGoldenRodYellow",
    xNumOfTicks: 4,
    yNumOfTicks: 10, 
    xScale: true,
    yScale: false
  };
  
  createChart(data, column1)
}

var createChart = function(data, colData) {

  console.log("colData", colData)

  // Set up the globals
  var margin = {top: 30, right:40, bottom: 30, left: 50};
  var width = colData.width;
  var height = colData.height;

  var x = d3.scale.linear()
    .domain([0, colData.scaleRange])
    .range([0, colData.width]);

  var y = d3.scale.linear()
    .range([height, 0])
    .domain([d3.max(data, function(d) {  return d.depth; }), 0]);

  // Define the lines
  // Make this a separate function so that multiple lines can be made
  // and set to different variables
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

    case "press":
      console.log("Plotting Pressure data")
      var lineData = d3.svg.line()
        .x(function(d) { return x(d.pressure); })
        .y(function(d) { return y(d.depth);    })
        .interpolate("basis")
      break;
    
    case "rop":
      console.log("Plotting ROP data")
      var lineData = d3.svg.line()
        .x(function(d) { return x(d.rop); })
        .y(function(d) { return y(d.depth);    })
        .interpolate("basis")
      break;
    
    case "wob":
      console.log("Plotting WOB data")
      var lineData = d3.svg.line()
        .x(function(d) { return x(d.wob); })
        .y(function(d) { return y(d.depth); })
        .interpolate("basis")
      break;

    case "depth":
      console.log("No Data")
      var lineData = d3.svg.line()
        .y(function(d) { return y(d.depth); })
      break;
  }
   
  // Add the canvas
  var svg = d3.select("#col1")
  // var svg = d3.select("#chart")
    .append("svg")
      .attr("transform", "translate(" + colData.offset + ", 0)")
    .append("g")
      .attr("transform", "translate(0, 0)");
  
  // Define the axes
  var xAxis = d3.svg.axis().scale(x)
    .orient("top")
    .ticks(colData.xNumOfTicks)
    // .tickSize([height - 20])
    .tickSubdivide(3)
    .tickSize(height - 20, 100, 100); 
         
  var yAxis = d3.svg.axis().scale(y)
    .orient("left")
    .ticks(colData.yNumOfTicks)

  // Add the x-axis
  if (colData.xScale) {
    svg.append("g")
      .attr("class", "x axis")
      .attr("fill", 1)
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxis)
  }

  // Add the y-axis
  if (colData.yScale) {
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0, 0)")
      .call(yAxis)
      .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
  }

  // Add the line path
  svg.append("path")
      .attr("class", "line")
      .attr("d", lineData(data))
      .style({
        fill: colData.fill,
        stroke: colData.color,
      });

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











$(document).ready(function(){
	drawCanvas();

	d3.json("/measurements", draw);

	d3.select("#xScale").on("input", function() {
	  	// setupXAxis(+this.value);
	  	updateXScale(+this.value);
	  	// console.log(+this.value);
	});

	$('#depthForm').on('submit', function(event) {
		event.preventDefault();
		console.log("button Pressed")
		minDepthScale = $('input[name="minDepth"]').val();  //Get minimum depth scale from input
		maxDepthScale = $('input[name="maxDepth"]').val();	//Get maximum depth scale from input
		updateDepthScale(minDepthScale, maxDepthScale)

	})
});

// Global variables
var xScale;
var lineXScale;
var depthScale;
var chart;
var col;
var depthAxis;
var maxDepth;
var minDepth;
var maxDepthScale;
var minDepthScale;
var keyItems;
var params = ['temp_out', 'temp_in', 'pressure', 'wob', 'rop'];
var idKey = {
	temp_out: 'Temp Out',
	temp_in: 'Temp In',
	pressure: 'Pressure',
	wob: 'WOB',
	rop: 'ROP'
};

var data;

var container_dimensions = {
	width: 800,
	height: 800
};

var margins = {
	top: 10,
	right: 20,
	bottom: 30,
	left: 60
};

var chart_dimensions = {
	width: container_dimensions.width - margins.left - margins.right,
	height: container_dimensions.height - margins.top - margins.bottom
};

function draw(data) {
	this.data = data;
	maxDepth = d3.max(data, function(d) {  return d.depth; })
	minDepth = d3.min(data, function(d) {  return d.depth; })

	setupXAxis(400); 						// Set initial max value for x axis
	setupDepthAxis(minDepth, maxDepth);  	// Setup default axis with min and max data range

	// Build the key
	keyItems = d3.select('#key')
		.selectAll('div')
		.data(params)
		.enter()
		.append('div')
			.attr('class', 'parameter')
			// Give each div a unique id based on parameter
			.attr('id', function(d) { return d });

	keyItems.append('div')
		.attr('id', function(d) { return 'key_square_' + d })
		.attr('class', 'key_square');

	keyItems.append('div')
		.attr('class', 'key_label')
		.text(function(d) { return idKey[d] })

	// Add chart when clicked
	var active_path = d3.selectAll(".parameter")
		.on('click', function() {
			if (d3.select(this).attr('class') == 'parameter') {
				d3.select(this).classed('parameter active', true)
			} else if (d3.select(this).attr('class') == 'parameter active') {
				d3.select(this).classed('parameter active', false)
				d3.select(this).classed('parameter', true)
			}
			var curr_id = d3.select(this).attr('id')
			getData(curr_id);
		});
			// drawLine2()
};


function updateXScale(maxValX) {
		d3.select('.x').remove();	// Remove existing axis
		setupXAxis(maxValX);		// Redraw axis with new max value

		d3.select('.line_path').remove();

		var active_path = d3.selectAll('.active')


			.each(function(d) {
				// console.log('this is d: ', d)
				getData(d);
			});
}

function updateDepthScale(minDepth, maxDepth) {

		d3.select('.depth').remove();	// Remove existing axis

		setupDepthAxis(minDepth, maxDepth);		// Redraw axis with new max value

		d3.select('.line_path').remove();

		var active_path = d3.selectAll('.active')
			.each(function(d) {
				// console.log('this is d: ', d)
				getData(d);
			});
}
function drawCanvas() {
	// Todo: create a separate svg element for the depth scale
	// to keep it separate from the chart_container

	chart = d3.select('#chart_container')
		.append('svg')
			.attr('width', container_dimensions.width)
			.attr('height', container_dimensions.height)
		.append('g')
			.attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
			.attr('id', 'chart');
};

function setupXAxis(maxVal) {

	xScale = d3.scale.linear()
		.range([0, chart_dimensions.width])
		.domain([0, maxVal]);

	lineXScale = d3.scale.linear()
		.range([0, chart_dimensions.width])
		.domain([0, maxVal]);

 	xAxis = d3.svg.axis()
    	.scale(xScale);

    chart.append('g')
   		.attr('class', 'x axis')
   		.attr('transform', 'translate(0,' + chart_dimensions.height + ')')
   		.call(xAxis);
}

function setupDepthAxis(min, max) {
	depthScale = d3.scale.linear()
		.range([chart_dimensions.height, 0])
    	.domain([max, min]);

    depthAxis = d3.svg.axis()
   		.scale(depthScale)
   		.orient('left');

	chart.append('g')
   		.attr('class', 'depth axis')
   		.call(depthAxis);

   	d3.select('.depth.axis')
   		.append('text')
   			.attr('text-anchor', 'middle')
   			.attr('transform', 'rotate (-270, 0, 0)')
   			.attr('font-family', 'Verdana')
   			.attr('font-size', '15')
			.attr('x', container_dimensions.height/2)
			.attr('y', 50)
			.attr('letter-spacing', 5)
   			.text('Depth (ft)');
}

function getData(curr_id) {
	// var id = d3.select(this).attr('id')
	var id = curr_id;
	var itemClass = d3.select('#' + id).attr('class')
	var ts = d3.select('#' + id + '_path');

	// console.log('this', this);
	filtered_data = [];
	if (ts.empty()) {
		// console.log('filtered data: ', filtered_data)

		for (row in data) {
			filtered_data.push({
				'param': data[row][id],
				'depth': data[row]['depth']
			})
		}

			drawLine(filtered_data, id)

	} else {
		ts.remove();
	}
}

function drawLine(filtered_data, id) {
	// console.log(id);
	// console.log(filtered_data)
	var lineData = d3.svg.line()
        // .x(function(d) { return xScale(d.temp_out); })
        .x(function(d) { return lineXScale(d.param) })
        .y(function(d) { return depthScale(d.depth) })
        .interpolate("linear");

    // console.log(id);

  	var g = d3.select('#chart')
  		.append('svg')  //This svg is the element that the lines are drawn on
  			.attr('x', 0)
  			.attr('y', 0)
  			.attr('height', chart_dimensions.height)
  			.attr('class', 'line_path')
  		.append('g')
	  		.attr('id', id + '_path')
	  		// .attr('class', id);

  	g.append('path')
	  		.attr('d', lineData(filtered_data))
	  		.style('fill', 'none');

	 d3.select('#temp_out_path').style('stroke', 'red');
	 d3.select('#temp_in_path').style('stroke', 'blue');
	 d3.select('#pressure_path').style('stroke', 'red');
	 d3.select('#wob_path').style('stroke', 'black');
	 d3.select('#rop_path').style('stroke', 'green');
}


function drawLine2() {

	for (var i = 0; i < params.length; i++) {
		var lineData = d3.svg.line()
	        .x(function(d) { return lineXScale(d[params[i]]) })
	        .y(function(d) { return depthScale(d.depth) })
	        .interpolate("step-after");

		appendData(lineData, params[i]);
    }

    var tempInLineData = d3.svg.line()
        .x(function(d) { return lineXScale(d.temp_in) })
        .y(function(d) { return depthScale(d.depth);    })
        .interpolate("linear");

    // console.log(id);

    function appendData(lineData, id) {
		var g = d3.select('#chart')
  			.append('svg')				// This svg is the element that the lines are drawn on
	  			.attr('x', 0)
	  			.attr('y', 0)
	  			.attr('height', chart_dimensions.height)
	  			.attr('class', 'line_path')
	  		.append('g')
		  		.attr('id', id + '_path')

  		g.append('path')
	  		.attr('d', lineData(data))
	  		.style('fill', 'none');
	}

	 d3.select('#temp_out_path').style('stroke', 'red');
	 d3.select('#temp_in_path').style('stroke', 'blue');
	 d3.select('#pressure_path').style('stroke', 'red');
	 d3.select('#wob_path').style('stroke', 'black');
	 d3.select('#rop_path').style('stroke', 'green');
}










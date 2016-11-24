// $(document).ready(function(){
// 	drawCanvas();

// 	d3.json("/measurements", draw);

// }); 

// // Global variables
// var xScale;
// var lineXScale;
// var depthScale;
// var chart;
// var col;
// var depthAxis;
// var maxDepth;
// var keyItems;
// var params = ['temp_out', 'temp_in', 'pressure', 'wob', 'rop'];
// var idKey = {
// 	temp_out: 'Temp Out', 
// 	temp_in: 'Temp In', 
// 	pressure: 'Pressure', 
// 	wob: 'WOB', 
// 	rop: 'ROP'
// }; 

// var data;

// var container_dimensions = {
// 	width: 800, 
// 	height: 500
// };

// var margins = 0	top: 10, 
// 	right: 0, 
// 	bottom: 30, 
// 	left: 0
// };

// var chart_dimensions = {
// 	width: container_dimensions.width - margins.left - margins.right,
// 	height: container_dimensions.height - margins.top - margins.bottom
// };

// function td(stuff) {
// 	console.log(stuff);
// }

// function draw(data) {
// 	this.data = data;
// 	maxDepth = d3.max(data, function(d) {  return d.depth; })
// 	setupXAxis();
// 	setupDepthAxis();
// 	//Build the key

// 	keyItems = d3.select('#key')
// 		.selectAll('div')
// 		.data(params)
// 		.enter()
// 		.append('div')
// 			.attr('class', 'parameter')
// 			// Give each div a unique id based on parameter
// 			.attr('id', function(d) { return d });

// 	console.log(idKey['tempIn'])

// 	keyItems.append('div')
// 		.attr('id', function(d) { return 'key_square_' + d })
// 		.attr('class', 'key_square');

// 	keyItems.append('div')
// 		.attr('class', 'key_label')
// 		.text(function(d) { return idKey[d] })

// 	// Add chart when clicked	
// 	d3.selectAll(".parameter")
// 		.on('click', getData);

// };

// function drawCanvas() {
// 	// Todo: create a separate svg element for the depth scale 
// 	// to keep it separate from the chart_container
// 	col = d3.select('#chart_container')
// 		.append('svg')
// 			.attr('width', 100)
// 			.attr('height', container_dimensions.height)
// 			.attr('id', 'depth-col');

// 	chart = d3.select('#chart')
// 		.append('g')
// 			.attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
// 			// .attr('id', 'chart');

// 	xCol = d3.select('#x-axis')
// 		.append('g')
// 			.attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
// 			// .attr('id', 'chart');
// };

// function setupXAxis() {
// 	xScale = d3.scale.linear()
// 		.range([0, chart_dimensions.width])
// 		.domain([0, 400]);

// 	lineXScale = d3.scale.linear()
// 		.range([0, chart_dimensions.width])
// 		.domain([0, 400]);

//  	xAxis = d3.svg.axis()
//     	.scale(xScale)
//     	.orient('bottom');

//     xCol.append('g')
//    		.attr('class', 'x axis')
//    		// .attr('transform', 'translate(0,' + chart_dimensions.height + ')')
//    		.call(xAxis);
// }

// function setupDepthAxis() {
// 	depthScale = d3.scale.linear()
// 		.range([chart_dimensions.height, 0])
//     	.domain([maxDepth, 0]);

//     depthAxis = d3.svg.axis()
//    		.scale(depthScale)
//    		.orient('right');

// 	col.append('g')
//    		.attr('class', 'depth axis')
//    		.call(depthAxis);

//    	d3.select('#depth-axis')
//    		.append('text')
//    			.attr('text-anchor', 'middle')
//    			.text('Depth (ft)')
//    			.attr('transform', 'rotate (-270, 0, 0)')
//    			.attr('font-family', 'Verdana')
//    			.attr('font-size', '15')
// 			.attr('x', 250)
// 			// .attr('y', 50)
// 			.attr('letter-spacing', 5);
// }

// function getData() {
// 	var id = d3.select(this).attr('id')
// 	var itemClass = d3.select(this).attr('class')
// 	var ts = d3.select('#' + id + '_path');
// 	// console.log('this', this);
// 	filtered_data = [];
// 	if (ts.empty()) {
// 		// console.log('filtered data: ', filtered_data)

// 		for (row in data) {
// 			filtered_data.push({
// 				'param': data[row][id],
// 				'depth': data[row]['depth']
// 			})
// 		}

// 			drawLine(filtered_data, id)
		
// 	} else {
// 		ts.remove();
// 	}
// }

// function drawLine(filtered_data, id) {

// 	// console.log(filtered_data)
// 	var lineData = d3.svg.line()
//         // .x(function(d) { return xScale(d.temp_out); })
//         .x(function(d) { return lineXScale(d.param) })
//         .y(function(d) { return depthScale(d.depth);    })
//         .interpolate("basis");

//     console.log(id);

//   	var g = d3.select('#chart')
//   		.append('g')
//   		.attr('id', id + '_path')
//   		.attr('class', id.split('_')[1]);

//   	g.append('path')
//   		.attr('d', lineData(filtered_data))
//   		.style({
//         fill: 'none',
//         stroke: 'blue',
//       });;

// }

// // Joins in D3 
// // d3.select("svg") - selects a container SVG element on the page
// // 	.selectAll("circle") - creates an empty selection to bind data
// // 	.data(data) - binds data to the empty selection
// // 	.enter() - selects all bound data elements not displayed
// // 	.append("circle") - creates SVG elements for the bound data












// Filename: complexCode.js

/*
This code demonstrates a complex and sophisticated example of a real-time data visualization application.
The code is designed to generate a dynamic and interactive chart displaying live data from a simulated IoT sensor network.
*/

// Constants
const CHART_WIDTH = 800;
const CHART_HEIGHT = 400;
const MAX_DATA_POINTS = 1000;
const UPDATE_INTERVAL = 1000; // in milliseconds

// Variables
let chartContainer;
let svgContainer;
let xScale, yScale;
let xAxis, yAxis;
let data = [];

// Helper Functions
function generateRandomData() {
  // Simulate sensor data
  const newDataPoint = Math.random() * 100;
  
  if (data.length === MAX_DATA_POINTS) {
    data.shift();
  }
  data.push(newDataPoint);
}

function updateChart() {
  // Update scales and axes
  xScale.domain(d3.range(data.length));
  yScale.domain([0, d3.max(data)]);

  svgContainer.select(".x-axis")
    .transition()
    .duration(UPDATE_INTERVAL) // Smooth transition
    .call(xAxis);
  
  svgContainer.select(".y-axis")
    .transition()
    .duration(UPDATE_INTERVAL) // Smooth transition
    .call(yAxis);

  // Update chart lines
  const line = d3.line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d));

  svgContainer.select(".chart-line")
    .datum(data)
    .transition()
    .duration(UPDATE_INTERVAL)
    .attr("d", line);

  // Generate new random data point
  generateRandomData();
}

// Initialization
function initializeChart() {
  chartContainer = document.getElementById("chart-container");

  svgContainer = d3.select(chartContainer)
    .append("svg")
    .attr("width", CHART_WIDTH)
    .attr("height", CHART_HEIGHT);

  xScale = d3.scaleLinear()
    .range([0, CHART_WIDTH])
    .domain([0, MAX_DATA_POINTS]);

  yScale = d3.scaleLinear()
    .range([CHART_HEIGHT, 0])
    .domain([0, 100]);

  xAxis = d3.axisBottom(xScale);
  yAxis = d3.axisLeft(yScale);

  svgContainer.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${CHART_HEIGHT})`)
    .call(xAxis);

  svgContainer.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

  svgContainer.append("path")
    .datum(data)
    .attr("class", "chart-line")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2);
}

// Main Function
function runRealTimeDataVisualization() {
  setInterval(updateChart, UPDATE_INTERVAL);
}

// Start Visualization
initializeChart();
runRealTimeDataVisualization();

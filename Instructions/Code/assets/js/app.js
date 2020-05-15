// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 600;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 60
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(stateData) {
    console.log(stateData);

    stateData.forEach(function(d) {
        d.healthcare = +d.healthcare;
        d.poverty = +d.poverty;
    });

    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(stateData, data => data.poverty)])
        .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([4, d3.max(stateData, data => data.healthcare)])
        .range([chartHeight, 0]);
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .call(leftAxis);
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    
    chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", function(d) { 
            return xLinearScale(d.poverty); 
        })
        .attr("cy", function(d) {
            return yLinearScale(d.healthcare);
        })
        .attr("r", "13")
        .attr("class", "stateCircle");

    chartGroup.selectAll("text")
        .data(stateData)
        .enter()
        .append("text")
        .text(function(d) {
            return d.abbr;
        })
        .attr("x", function(d) {
            return xLinearScale(d.poverty);
        })
        .attr("y", function(d) {
            return yLinearScale(d.healthcare) + 5;
        })
        .attr("font-size", "12px")
        .attr("class", "stateText");
    
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 30})`)
        .attr("class", "aText")
        .text("Poverty (%)");

}).catch(function(error) {
    console.log(error);
});
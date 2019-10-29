// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 600;

var margin = {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25
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
        .domain([0, d3.max(stateData, data => data.healthcare)])
        .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, data => data.poverty)])
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
            return xLinearScale(d.healthcare); 
        })
        .attr("cy", function(d) {
            return yLinearScale(d.poverty);
        })
        .attr("r", "5")
        .attr("fill", "#17a2b8");

    chartGroup.selectAll("text")
        .data(stateData)
        .enter()
        .append("text")
        .text(function(d) {
            return d.abbr;
        })
        .attr("x", function(d) {
            return xLinearScale(d.healthcare);
        })
        .attr("y", function(d) {
            return yLinearScale(d.poverty);
        })
        .attr("font-size", "12px");
    
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 25)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisLabel")
        .text("Poverty (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top - 30})`)
        .attr("class", "axisLabel")
        .text("Healthcare (%)");

}).catch(function(error) {
    console.log(error);
});
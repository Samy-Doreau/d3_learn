var w = 600;
var h = 250;
var padding = 40;

var dataset = [];
var numDataPoints = 200;
var xRange = 1000;
var yRange = 1000;
for (let i = 0; i < numDataPoints; i++) {
  var newNumber1 = Math.floor(Math.random() * xRange);
  var newNumber2 = Math.floor(Math.random() * yRange);

  dataset.push([newNumber1, newNumber2]);
}

// Create scales

var xScale = d3
  .scaleLinear()
  .domain([
    d3.min(dataset, function (d) {
      return d[0];
    }),
    d3.max(dataset, function (d) {
      return d[0];
    }),
  ])
  .range([padding, w - padding / 2]);

var yScale = d3
  .scaleLinear()
  .domain([
    d3.min(dataset, function (d) {
      return d[1];
    }),
    d3.max(dataset, function (d) {
      return d[1];
    }),
  ])
  .range([h - padding, padding / 2]);

// Define axis

var xAxis = d3.axisBottom().scale(xScale).ticks(10);
var yAxis = d3.axisLeft().scale(yScale).ticks(10);

// Create svg element

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

// Create circles
var allCircles = svg
  .selectAll("circles")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", function (d) {
    return xScale(d[0]);
  })
  .attr("cy", function (d) {
    return yScale(d[1]);
  })
  .attr("r", 2.5);

// Create axis
svg
  .append("g")
  .attr("class", "axis")
  .attr("transform", `translate(0,${h - padding})`)
  .call(xAxis);

svg
  .append("g")
  .attr("class", "axis")
  .attr("transform", `translate(${padding},0)`)
  .call(yAxis);

// d3.selectAll("input").on("change", function (d) {
//   var threshold = +d3.select(this).node().value;
//   allCircles
//     .attr("fill", "black")
//     .filter(function (d) {
//       return d[0] <= threshold;
//     })
//     .attr("fill", "red");
// });

var freakOut = function (d, i) {
  var colors = d3.schemeTableau10;
  var colorIndex = Math.round(Math.random() * 20);

  d3.select(this)
    .transition()
    .delay(i * 25)
    .duration(2000)
    .ease(d3.easeElasticOut)
    .attr("fill", colors[colorIndex])
    .attr("r", 25);
};

d3.selectAll("input").on("click", function () {
  allCircles.each(freakOut);
});

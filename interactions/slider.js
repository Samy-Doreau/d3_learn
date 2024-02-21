var w = 600;
var h = 250;

var dataset = [
  { key: 0, value: 5 }, //dataset is now an array of objects.
  { key: 1, value: 10 }, //Each object has a 'key' and a 'value'.
  { key: 2, value: 13 },
  { key: 3, value: 19 },
  { key: 4, value: 21 },
  { key: 5, value: 25 },
  { key: 6, value: 22 },
  { key: 7, value: 18 },
  { key: 8, value: 15 },
  { key: 9, value: 13 },
  { key: 10, value: 11 },
  { key: 11, value: 12 },
  { key: 12, value: 15 },
  { key: 13, value: 20 },
  { key: 14, value: 18 },
  { key: 15, value: 17 },
  { key: 16, value: 16 },
  { key: 17, value: 18 },
  { key: 18, value: 23 },
  { key: 19, value: 25 },
];

var xScale = d3.scaleBand().domain(d3.range(dataset.length)).rangeRound([0, w]);
var yScale = d3
  .scaleLinear()
  .domain([
    d3.min(dataset, function (d) {
      return d.value;
    }),
    d3.max(dataset, function (d) {
      return d.value;
    }),
  ])
  .range([0, h]);

var key = function (d) {
  return d.key;
};

// Create SVG element
var svg = d3.select("body").append("svg").attr("height", h).attr("width", w);

// Create bars
svg
  .selectAll("rect")
  .data(dataset, key)
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    return xScale(i);
  })
  .attr("width", function (d) {
    return xScale.bandwidth();
  })
  .attr("y", function (d) {
    return h - yScale(d.value);
  })
  .attr("height", function (d) {
    return yScale(d.value);
  })
  .attr("fill", function (d) {
    return `rgb(0,0,${d.value * 10})`;
  });

// Create labels
svg
  .selectAll("text")
  .data(dataset, key)
  .enter()
  .append("text")
  .text(function (d) {
    return d.value;
  })
  .attr("x", function (d, i) {
    return xScale(i) + xScale.bandwidth() / 2;
  })
  .attr("y", function (d) {
    return h - yScale(d.value) + 14;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white");

// Slider

d3.select("input").on("change", function () {
  var threshold = +d3.select(this).node().value;
  console.log(threshold);
  svg
    .selectAll("rect")
    .attr("fill", function (d) {
      return `rgb(0,0,${d.value * 10})`;
    })
    .filter(function (d) {
      return d.value <= threshold;
    })
    .attr("fill", "red");
});

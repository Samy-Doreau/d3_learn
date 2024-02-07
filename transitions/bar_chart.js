var dataset = [];
let var_len = Math.round(20 * Math.random(50), 0);
for (let i = 0; i < var_len; i++) {
  dataset.push(10 * Math.random(10));
}
var w = 500;
var h = 100;
var barPadding = 1;
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var xScale = d3
  .scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([0, w])
  .paddingInner(0.05);

svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    return xScale(i);
  })
  .attr("y", function (d) {
    return h - d * 6;
  })
  .attr("width", xScale.bandwidth())
  .attr("height", function (d) {
    return d * 6;
  })
  .attr("fill", function (d) {
    return `rgb(0,0,${Math.round(d * 10)})`;
  });

svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function (d) {
    return Math.round(d, 0);
  })
  .attr("x", function (d, i) {
    return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
  })
  .attr("y", function (d) {
    return h - d * 6 + 10;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white")
  .attr("text-anchor", "middle");

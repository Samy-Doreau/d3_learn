//Width and height
var w = 800;
var h = 300;
var padding = 40;

var dataset, xScale, yScale, xAxis, yAxis, line; //Empty, for now

//For converting Dates to strings
var formatTime = d3.timeFormat("%d/%m/%Y");

//Function for converting CSV values from strings to Dates and numbers
var rowConverter = function (d) {
  return {
    date: new Date(d.date),
    balance: parseFloat(d.balance),
  };
};

d3.csv("bank_balance.csv", rowConverter).then(function (data) {
  var dataset = data;
  // console.table(dataset, ["date", "balance"]);
  xScale = d3
    .scaleTime()
    .domain([
      d3.min(dataset, function (d) {
        return d.date;
      }),
      d3.max(dataset, function (d) {
        return d.date;
      }),
    ])
    .range([padding, w]);

  yScale = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, function (d) {
        return d.balance;
      }),
      d3.max(dataset, function (d) {
        return d.balance;
      }),
    ])
    .range([h - padding, padding]);

  xAxis = d3.axisBottom().scale(xScale).ticks(10).tickFormat(formatTime);
  yAxis = d3.axisLeft().scale(yScale).ticks(10);

  area = d3
    .area()
    .x(function (d) {
      return xScale(d.date);
    })
    .y0(function (d) {
      return yScale.range()[0];
    })
    .y1(function (d) {
      return yScale(d.balance);
    });

  // Create svg element

  var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

  // Create line

  svg.append("path").datum(dataset).attr("class", "area").attr("d", area);
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
});

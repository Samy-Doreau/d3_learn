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

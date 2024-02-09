var w = 600;
var h = 250;

var _dataset = [
  5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
];
let dataset = [];
for (let i = 0; i < _dataset.length; i++) {
  dataset.push({ key: i, value: _dataset[i] });
}

var xScale = d3
  .scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([0, w])
  .paddingInner(0.05);

var yScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(dataset, function (d) {
      return d.value;
    }),
  ])
  .range([0, h]);

var key = function (d) {
  return d.key;
};

//Create SVG element
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
var highlightRect = svg.append('rect').attr('x',0).attr('y',0).attr('width',0).attr('height',h).attr('fill','gray').style('opactity',0)


//Create bars
svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    return xScale(i);
  })
  .attr("y", function (d) {
    return h - yScale(d.value);
  })
  .attr("width", xScale.bandwidth())
  .attr("height", function (d) {
    return yScale(d.value);
  })
  .attr("fill", function (d) {
    return "rgb(0, 0, " + Math.round(d.value * 10) + ")";
  }).on("click", function(event,d){console.log(d.value)}).on("mouseover", function(event,d){
    d3.select(this).attr('fill', "orange");

    var x = xScale(d.key)
    var width = xScale.bandwidth()
    highlightRect.attr('x',x).attr('width', width).style('opacity',0.5)

  }).on('mouseout', function(d){
    d3.select(this).attr("fill", function (d) {
      return "rgb(0, 0, " + Math.round(d.value * 10) + ")";
    })

    highlightRect.style('opacity',0)
  });

//Create labels
svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function (d) {
    return d.value;
  })
  .attr("text-anchor", "middle")
  .attr("x", function (d, i) {
    return xScale(i) + xScale.bandwidth() / 2;
  })
  .attr("y", function (d) {
    return h - yScale(d.value) + 14;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white");

//On click, update with new data
d3.selectAll("p").on("click", function () {
  //Add one new value to dataset
  var paragraphID = d3.select(this).attr("id");

  if (paragraphID == "add") {
    var minValue = 2;
    var maxValue = 25 - minValue;
    var newNumber = Math.floor(Math.random() * maxValue) + minValue;
    var newKeyValue = dataset[dataset.length - 1].key + 1;
    dataset.push({ key: newKeyValue, value: newNumber });
  } else {
    dataset.shift();
  }

  //Update scale domains
  xScale.domain(d3.range(dataset.length)); //Recalibrate the x scale domain, given the new length of dataset
  yScale.domain([
    0,
    d3.max(dataset, function (d) {
      return d.value;
    }),
  ]); //Recalibrate the y scale domain, given the new max value in dataset

  //Select…
  var bars = svg
    .selectAll("rect") //Select all bars
    .data(dataset); //Re-bind data to existing bars, return the 'update' selection
  //'bars' is now the update selection

  //Enter…
  bars
    .enter() //References the enter selection (a subset of the update selection)
    .append("rect") //Creates a new rect
    .attr("x", w) //Sets the initial x position of the rect beyond the far right edge of the SVG
    .attr("y", function (d) {
      //Sets the y value, based on the updated yScale
      return h - yScale(d.value);
    })
    .attr("width", xScale.bandwidth()) //Sets the width value, based on the updated xScale
    .attr("height", function (d) {
      //Sets the height value, based on the updated yScale
      return yScale(d.value);
    })
    .attr("fill", function (d) {
      //Sets the fill value
      return "rgb(0, 0, " + Math.round(d.value * 10) + ")";
    })
    .merge(bars) //Merges the enter selection with the update selection
    .transition() //Initiate a transition on all elements in the update selection (all rects)
    .duration(500)
    .attr("x", function (d, i) {
      //Set new x position, based on the updated xScale
      return xScale(i);
    })
    .attr("y", function (d) {
      //Set new y position, based on the updated yScale
      return h - yScale(d.value);
    })
    .attr("width", xScale.bandwidth()) //Set new width value, based on the updated xScale
    .attr("height", function (d) {
      //Set new height value, based on the updated yScale
      return yScale(d.value);
    });

  bars
    .exit()
    .transition()
    .duration(500)
    .attr("x", -xScale.bandwidth())
    .remove();

  //Update all labels
  //
  //Exercise: Modify this code to add a new label each time a new bar is added!
  //

  var labels = svg.selectAll("text").data(dataset);

  labels
    .enter()
    .append("text")
    .text(function (d) {
      return d.value;
    })
    .attr("text-anchor", "middle")
    .attr("x", function (d, i) {
      return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function (d) {
      if (d.value <= 1) {
        return h - yScale(d.value) - 2;
      } else {
        return h - yScale(d.value) + 14;
      }
    })
    .attr("fill", function (d) {
      if (d.value <= 1) {
        return "black";
      } else {
        return "white";
      }
    })
    .merge(labels)
    .transition()
    .duration(500)
    .text(function (d) {
      return d.value;
    })
    .attr("x", function (d, i) {
      return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function (d) {
      if (d.value <= 1) {
        return h - yScale(d.value) - 2;
      } else {
        return h - yScale(d.value) + 14;
      }
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", function (d) {
      if (d.value <= 1) {
        return "black";
      } else {
        return "white";
      }
    });

  labels.exit().transition().duration(500).attr("x", w).remove();
});

var data = averages.filter(category => category.show == true);

// Setup SVG canvas w/ margin
var svg = d3.select("svg"),
  margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Assign color scale for graph
var z = d3
  .scaleOrdinal()
  .range([
    "#98abc5",
    "#8a89a6",
    "#7b6888",
    "#6b486b",
    "#a05d56",
    "#d0743c",
    "#ff8c00"
  ]);

// updateChart essentially rerenders the whole charts using the filtered data passed to it in updateFilter below
function updateChart(data) {
  //generate the settings for the x and y scales
  var x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(
      data.map(function(d) {
        console.log(d.category);
        return d.category;
      })
    );

  var y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([
      0,
      d3.max(data, function(d) {
        return d.average;
      })
    ]);

  //first remove the existing axes/titles, and rerended w/ new data
  g.select(".xaxis").remove();
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "xaxis")
    .call(d3.axisBottom(x));

  svg.select(".xTitle").remove();
  svg
    .append("text")
    .attr("class", "xTitle")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 40) + ")"
    )
    .style("text-anchor", "middle")
    .text("Category");

  g.select(".yaxis").remove();
  g.append("g")
    .attr("class", "yaxis")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Salary Increase");

  //Remove all the bars and redraw them all. not ideal, but works
  g.selectAll(".bar")
    .remove()
    .exit()
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.category);
    })
    .attr("y", function(d) {
      return y(d.average);
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
      return height - y(d.average);
    })
    .attr("fill", function(d) {
      return z(d.category);
    });
}
//draw the chart initially
updateChart(data);

//updateFilter is called from checkbox toggles in the HTML, and flips the "show" Boolean of the data object.
function updateFilter(category) {
  for (let average of averages) {
    if (average.category == category) {
      average.show = !average.show;
    }
  }
  //filter the data based on whether it should be shown
  updateChart(averages.filter(category => category.show == true));
  console.log(
    "This will hopefully maybe update something. Someday.",
    category,
    data
  );
}

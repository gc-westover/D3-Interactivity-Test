var data = averages.filter(category => category.show == true);
// var data = averages;

var svg = d3.select("svg"),
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

function updateChart(data) {
  var data = averages.filter(category => category.show == true);

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

  g.select(".xaxis").remove();
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "xaxis")
    .call(d3.axisBottom(x));

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

updateChart(data);

function updateFilter(category) {
  for (let average of averages) {
    if (average.category == category) {
      average.show = !average.show;
    }
  }
  // data = averages.filter(category => category.show == true);
  updateChart(data);
  // updateAxis();
  console.log(
    "This will hopefully maybe update something. Someday.",
    category,
    data
  );
}

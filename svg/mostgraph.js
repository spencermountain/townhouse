
function mostgraph(data){

 // var all=[{title:"lala", domain:"http://facebook.com", count:30},{title:"facebook", domain:"http://facebook.com", count:24},{title:"basdfs", domain:"http://facebook.com", count:4},{title:"state", domain:"http://state.it", count:14}]


    var w=700
    var h=50
    svg=d3.select("#mostgraph")
    .append("svg:svg")
    .attr("height",h)
    .attr("width",function(){return w})

    var x = d3.scale.linear()
    .domain([0, 50])
    .range([0, 390]);

    rect= svg.selectAll("rect")
      .data(data)
      .enter().append("rect")

      rect.attr("x", function(d,i){
        if(i==0){return x(0)}
         return x( data.slice(0,i).reduce(function(p,c){
          return parseInt(p)+c.count
        },0))
       })
      .attr("y", function(d) { return 0; })
      .attr("height", "25px")
      .attr("width", function(d) { return 0 })
      .attr("fill-opacity", .5)
      .attr("title", function(d,i){return d.title})
      .style("fill", function(d,i){return d.colour})

      rect
      .transition()
      .duration(1000)
      .attr("width", function(d,i){return x(d.count)})

      rect.append("svg:title")
      .text(function(d,i) { return d.domain +' ' });






  // var data = _.pluck(all,'count');

  // var w = 430,
  //     h = 270,
  //     x = d3.scale.linear().domain([0, d3.max(data) ]).range([0, w]),
  //     y = d3.scale.ordinal().domain(d3.range(data.length)).rangeBands([0, h], .4);

  // var vis = d3.select("#mostgraph")
  //   .append("svg:svg")
  //     .attr("width", w + 40)
  //     .attr("height", h + 20)
  //   .append("svg:g")
  //     .attr("transform", "translate(20,0)");

  // var bars = vis.selectAll("g.bar")
  //     .data(data)
  //     .enter().append("svg:g")
  //     .attr("class", "bar")
  //     .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; })
  //     .on("click", function(s,i) { window.location=all[i].link;})

  // bars.append("svg:rect")
  //     .attr("fill", "steelblue")
  //     .attr("width", 0)
  //     .attr("height", y.rangeBand())
  //   .transition()
  //     .duration(750)
  //     .attr("width", x)

  // //hover count
  //   bars.append("svg:title")
  //   .text(function(s,i) { return all[i].count +' ' +all[i].domain +' ' });

  // //add text
  // bars.append("svg:text")
  //     .attr("x", x)
  //     .attr("y", y.rangeBand() / 2)
  //     .attr("dx", -6)
  //     .attr("dy", ".45em")
  //     .attr("fill", "white")
  //     .attr("text-anchor", "end")
  //     .attr("font-size", "13")
  //     .text(function(s,i){return all[i].domain});


 }

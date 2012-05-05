
function mostgraph(data){

    var w=700
    var h=50
    svg=d3.select("#mostgraph")
    .append("svg:svg")
    .attr("height",h)
    .attr("width",function(){return w})

    var x = d3.scale.linear()
    .domain([0, d3.max(data.map(function(v){return v.count}))])
    .range([0, 90]);

    rect= svg.selectAll("rect")
      .data(data)
      .enter().append("rect")

      rect.attr("x", function(d,i){
        if(i==0){return x(0)}
         return x(
                  data.slice(0,i).reduce(function(p,c){
                    return parseInt(p)+c.count
                  },0)
       )
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
      //.on("click", function(s,i) { showdomain(data[i].domain)})

      rect.append("svg:title")
      .text(function(d,i) { return d.domain +' ' });


 }

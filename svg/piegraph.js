function showpie(all){

  var data=_.pluck(all.slice(0,10),'count')
  var w = 75,
      h = 75,
      r = Math.min(w, h) / 2,
      color = d3.scale.category20(),
      donut = d3.layout.pie();
      arc = d3.svg.arc().innerRadius(r * .6).outerRadius(r);


  var vis = d3.select("#piegraph")
    .append("svg:svg")
      .data([data.sort(d3.descending)])
      .attr("width", w)
      .attr("height", h);

  var arcs = vis.selectAll("g.arc")
      .data(donut)
    .enter().append("svg:g")
      .attr("class", "arc")
      .attr("transform", "translate(" + r + "," + r + ")")
      .attr("d", arc)
      .on("click", function(s,i) { window.location=all[i].link;})


  arcs.transition()
      .duration(2200)
      .attrTween("d", maketitle);

  function maketitle(b){
 /* arcs.append("svg:text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("display", function(d) { return d.value > .15 ? null : "none"; })
      .text(function(d, i) { return all[i].domain.substr(0,15) });
      */
  }

    //hover count    
      arcs.append("svg:title")
      .text(function(s,i) { return all[i].count+' of '+all[i].domain });


  var paths = arcs.append("svg:path")
      .attr("fill", function(d, i) { return color(i); });

  paths.transition()
      .duration(1000)
      .attrTween("d", tweenPie);

  paths.transition()
      .ease("elastic")
      .delay(function(d, i) { return 1000 + i * 5; })
      .duration(750)
      .attrTween("d", tweenDonut);

  function tweenPie(b) {
    b.innerRadius = 0;
    var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
    return function(t) {
      return arc(i(t));
    };
  }

  function tweenDonut(b) {
    b.innerRadius = r * .6;
    var i = d3.interpolate({innerRadius: 0}, b);
    return function(t) {
      return arc(i(t));
    };
  }

  }

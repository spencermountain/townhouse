
function makelinegraph(){


   get_history(1, function(tabs){    
       tabs=tabs.reverse();
       var start=tabs[0].lastVisitTime;
       var unit=300000;//5minutes      
       var histogram=[]
       for(var i =tabs[0].lastVisitTime; i<=tabs[tabs.length-1].lastVisitTime; i=i+unit){
         var within=_.filter(tabs, function(tab){ return tab.lastVisitTime<i && tab.lastVisitTime>i-unit  });
           histogram.push({date: i, count:within.length, tabs:within })        
       }
    console.log(histogram) ;   
   


var values=[
{"date":"1321625509727","count":"1304.46"},
{"date":"1321735519727","count":"1266.42"},
{"date":"1321845521727","count":"798.58"},
{"date":"1321955524727","count":"266.42"},
{"date":"1322065529727","count":"98.58"}
]
values=histogram;

var m = [20, 40, 20, 20],
    w = 960 - m[1] - m[3],
    h = 140 - m[0] - m[2];

var    parse = function(t){
        var d=new Date();
        d.setTime(t);
        return d;
        }
        
// Scales. Note the inverted domain for the y-scale: bigger is up!
var x = d3.time.scale().range([0, w]),
    y = d3.scale.linear().range([h, 0]);

// Axes.
var xAxis = d3.svg.axis().scale(x),
    yAxis = d3.svg.axis().scale(y).ticks(4).orient("right");

// An area generator, for the light fill.
var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x(d.date); })
    .y0(h)
    .y1(function(d) { return y(d.count); });

// A line generator, for the dark stroke.
var line = d3.svg.line()
    .interpolate("monotone")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.count); });

  // Parse dates and numbers. We assume values are sorted by date.
  values.forEach(function(d) {
    d.date = parse(d.date);
    d.count = +d.count;
  });

  // Compute the minimum and maximum date, and the maximum count.
  x.domain([values[0].date, values[values.length - 1].date]);
  y.domain([0, d3.max(values, function(d) { return d.count; })]);

  // Add an SVG element with the desired dimensions and margin.
  var svg = d3.select("#linegraph").append("svg:svg")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
    .append("svg:g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

  // Add the clip path.
  svg.append("svg:clipPath")
      .attr("id", "clip")
    .append("svg:rect")
      .attr("width", w)
      .attr("height", h);

  // Add the area path.
  svg.append("svg:path")
      .attr("class", "area")
      .attr("clip-path", "url(#clip)")
      .attr("d", area(values));

  // Add the x-axis.
  svg.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);

  // Add the y-axis.
  svg.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + w + ",0)")
      .call(yAxis);

  // Add the line path.
  svg.append("svg:path")
      .attr("class", "line")
      .attr("clip-path", "url(#clip)")
      .attr("d", line(values));



  // On click, update the x-axis.
  svg.on("click", function() {
    var n = values.length - 1,
        i = 2,
        j = 4;
    x.domain([values[i].date, values[j].date]);
    var t = svg.transition().duration(750);
    t.select(".x.axis").call(xAxis);
    t.select(".area").attr("d", area(values));
    t.select(".line").attr("d", line(values));
  });
  
  });
}

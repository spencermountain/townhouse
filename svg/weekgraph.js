
function weekgraph(){

  get_history(7, function(tabs){
       tabs=tabs.reverse();
       var start=tabs[0].lastVisitTime;
       var unit=300000;//5minutes
       var byday={};
       for(var i  in tabs){
         var d = new Date();
         d.setTime(tabs[i].lastVisitTime);
         var day=d.getDay()||0;
         var date=d.getDate()||0;

        var days={
        0:{day:"sunday", colour:"#84B154"},
        1:{day:"monday", colour:"#3B6C8F"},
        2:{day:"tuesday", colour:"#3B7F8F"},
        3:{day:"wednesday", colour:"#3E9B96"},
        4:{day:"thursday", colour:"#468D99"},
        5:{day:"friday", colour:"#429B8F"},
        6:{day:"saturday", colour:"#357493"}
        }

         if(!byday[day]){byday[day]={day:day, weekday:days[day], date:date, count:0, tabs:[], };}
         byday[day].tabs.push(tabs[i]);
         byday[day].count++;
       }

    var data=[];
    for(var i in byday){
      data.push(byday[i])
    }

var days={
0:{day:"sunday", colour:"#84B154"},
1:{day:"monday", colour:"#3B6C8F"},
2:{day:"tuesday", colour:"#3B7F8F"},
3:{day:"wednesday", colour:"#3E9B96"},
4:{day:"thursday", colour:"#468D99"},
5:{day:"friday", colour:"#429B8F"},
6:{day:"saturday", colour:"#357493"}
}

 
 var width=parseInt($("html").css('width').replace(/px$/,'')*0.8);
 var height=parseInt($("html").css('height').replace(/px$/,'')*0.5);
var w = parseInt(width/data.length),
    h = height;

var x = d3.scale.linear().domain([0, data.length]).range([0, width]);
var y = d3.scale.linear().domain([0, d3.max(data, function(datum) { return datum.count; })]). rangeRound([0, height]);
    

var chart = d3.select("#weekgraph")
    .append("svg:svg")
    .attr("class", "chart")
    .attr("width", w * data.length - 1)
    .attr("height", h);

chart.selectAll("rect")
    .data(data)
    .enter().append("svg:rect")
    .attr("x", function(d, i) { return 0 })
    .attr("width", w+25)
    .attr("y", function(d) { return h - y(d.count) - .5; })
    .attr("height", function(d) { return y(d.count) })
    .style("fill", function(d) { return d.weekday.colour || "steelblue";})//d.domain; })
    .style("opacity", "0.7")//d.domain; })
    .transition()
    .duration(750)
    .attr("y", function(d) { return h - y(d.count) - .5; })
    .attr("height", function(d) { return y(d.count) })    
    .attr("x", function(d, i) { return x(i) - .5; })
    .attr("class", "weekday")

chart.selectAll("rect")
   .on("click", function(s,i) { generic_treemap(s.tabs)})
   .on("mouseover", function(s,i) { d3.select(this)
      .style('opacity','0.9')
      .attr("height", function(d) { return y(d.count+90) })    
      ;})
   .on("mouseout", function(s,i) { d3.select(this)
      .style('opacity','0.7')
      .attr('height',function(d){return y(d.count);});
      })
   .append("svg:title")
   .text(function(s,i) { return s.count +'  '+s.weekday.day  });

  //add text
  chart.selectAll("rect")
.append("svg:text")
      .attr("x",33)
      .attr("y", 33)
      .attr("fill", "white")
      .attr("font-size", "13")
      .text(function(s,i){return "eeeeee"});

chart.append("svg:line")
    .attr("x1", 0)
    .attr("x2", w * data.length)
    .attr("y1", h - .5)
    .attr("y2", h - .5)
    .attr("stroke", "#000");


})

}








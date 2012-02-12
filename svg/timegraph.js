
function timegraph(tabs){
       tabs=tabs.reverse();
       var start=tabs[0].lastVisitTime;
       var unit=300000;//5minutes
       var histogram=[]
       for(var i =tabs[0].lastVisitTime; i<=tabs[tabs.length-1].lastVisitTime; i=i+unit){
         var within=_.filter(tabs, function(tab){ return tab.lastVisitTime<=i && tab.lastVisitTime>=i-unit  });
         var googles=[];//getgoogles(within);        
         var domain=top_domain(within);
         histogram.push({date: i, count:within.length, tabs:within, googles:googles, domain:domain })
       }

 data=histogram;

 var width=parseInt($("html").css('width').replace(/px$/,'')*0.8);
 var height=parseInt($("html").css('height').replace(/px$/,'')*0.5);
var w = parseInt(width/histogram.length),
    h = height;

var x = d3.scale.linear().domain([0, data.length]).range([0, width]);
var y = d3.scale.linear().domain([0, d3.max(data, function(datum) { return datum.count; })]). rangeRound([0, height]);
    
console.log(data)
var chart = d3.select("#timegraph")
    .append("svg:svg")
    .attr("class", "chart")
    .attr("width", w * data.length - 1)
    .attr("height", h);


chart.selectAll("rect")
    .data(data)
    .enter().append("svg:rect")
    .attr("x", function(d, i) { return 0 })
    .attr("width", w)
    .attr("y", function(d) { return h - y(d.count) - .5; })
    .attr("height", function(d) { return y(d.count) })
    .style("fill", function(d) { return "steelblue";})//d.domain; })
    .transition()
    .duration(750)
    .attr("y", function(d) { return h - y(d.count) - .5; })
    .attr("height", function(d) { return y(d.count) })    
    .attr("x", function(d, i) { return x(i) - .5; })

chart.selectAll("rect")
   .on("click", function(s,i) { generic_treemap(histogram[i].tabs)})
   .append("svg:title")
   .text(function(s,i) { var h=new Date(); h.setTime(histogram[i].date); return h.getHours()+':'+h.getMinutes()+'   '+histogram[i].count +'  '+histogram[i].domain  });

chart.selectAll("rect")
      .append("svg:text")
      .attr("fill", "white")
      .attr("font-size", "33")
      .text("eee");

chart.append("svg:line")
    .attr("x1", 0)
    .attr("x2", w * data.length)
    .attr("y1", h - .5)
    .attr("y2", h - .5)
    .attr("stroke", "#000");



}




function top_domain(tabs){
      var domains={};
      for(var i in tabs){
         if(tabs[i].url.match(/^chrome/)){continue;}
      	 var parsed=parseUri(tabs[i].url);
         domain=parsed.host.replace(/^www\./,'');
         domain=domain.replace(/\.(org|net|com|co\.uk)/,'');
        // domain=domain.replace(/.*?\.(.{4}.*?)/,'$1');//regex subdomain
         if(domains[domain]){
           domains[domain]++;  
           console.log(domains)
         }else{
           domains[domain]=0;
         }     
      }
      var arr=[];      
      for(var i in domains){
        arr.push({count:domains[i], domain: i  })
      }
      arr=arr.sort(function(a,b){return a.count-b.count})
      if(arr[0]){
        return arr[0].domain;
        }
        else{return null}
}




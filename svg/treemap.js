
function treemap(tabs){
$("#stage").html('');
var w = 960,
    h = 500,
    color = d3.scale.category20c();

var treemap = d3.layout.treemap()
    .size([w, h])
    .sticky(true)
    .value(function(d) { return d.count; });

var div = d3.select("#stage")
    .style("position", "relative")
    .style("width", w + "px")
    .style("height", h + "px");
console.log('making treemap')
console.log(tabs)
  div.data([tabs]).selectAll("div")
      .data(treemap.nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.children ? color(d.title) : null; })
      .call(cell)
      .append("span")
      .style("color", "white")
      .style("opacity", "0.7")
      .html(function(d) { return d.children ? null : ""+d.title+'<br/><img src="'+d.favicon+'"/><span class="close" style="display:none;"><a href="closetab('+d.id+')" style="position:relative;bottom:0px; font-size:10px;">close</a></span> '; });
//<span class="close" style="display:none;"><a href="closetab('+d.id+')" style="position:relative;bottom:0px; font-size:10px;">close</a></span>

/*var refreshId = setTimeout(function() {
    div.selectAll("div")
        .data(treemap.value(function(d) {  if(d.image){return 100} return 50;       }))
      .transition()
        .duration(1500)
        .call(cell);
        
}, 500);
*/



function cell() {
  this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return d.dx - 1 + "px"; })
      .style("height", function(d) { return d.dy - 1 + "px"; })
      .attr('onClick', function(d) {
          if(d.id){return 'settab('+d.id+')';}
          //  return window.location=d.url;
          })
}

$(".cell").hover(
  function () {
    $(this).find(".close").fadeIn('fast');
  }, 
  function () {
    $(this).find(".close").fadeOut('fast')
  }
);

}


function nicetabs(){

  get_history(1, function(tabs){

    tabs=tabs.map(function(v){

     v.parsed=parseUri(v.url);
     v.favicon=null;
     if(v.parsed.host){
       v.favicon='chrome://favicon/http://'+v.parsed.host;
     }
      v.domain=v.parsed.host.replace(/^www\./,'');
      v.domain=v.domain.replace(/\.(org|net|com|co\.uk)/,'');

      v.title=parsetitle(v.title, v.url) || v.domain;
      return v
    })


    var colours=[
      "#1f77b4", "#aec7e8",
      "#ff7f0e", "#ffbb78",
      "#2ca02c", "#98df8a",
      "#d62728", "#ff9896",
      "#9467bd", "#c5b0d5",
      "#8c564b", "#c49c94",
      "#e377c2", "#f7b6d2",
      "#7f7f7f", "#c7c7c7",
      "#bcbd22", "#dbdb8d",
      "#17becf", "#9edae5"
    ];

    var domains=collate(_.pluck(tabs,'domain')).slice(0,20)
    domains.map(function(d, i){
      tabs=tabs.map(function(v){
        if(v.domain==d.key){
          v.colour=colours[i];
        }
        return v;
      })
    });
    tabs=tabs.map(function(v){
      if(!v.colour){v.colour='grey'}
        return v
    })
    circlething(tabs)
})
}

function collate(arr){
  var obj={}
  for(var i in arr){
    if(obj[arr[i]]){
      obj[arr[i]]++;
    }else{
      obj[arr[i]]=1;
    }
  }
  var arr=[];
    for(var i in obj){
        arr.push({key:i, value:obj[i]})
    }
    return arr.sort(function(a,b){return b.value - a.value})
}




function circlething(tabs){
  console.log('yyyyyyyyyyyyyyyyyyyyyyyy')
console.log(tabs)

var data=[0, 100, 67,23,42,52]


      svg=d3.select("#stage")
      .append("svg:svg")
      .attr("height",400)
      .attr("width",400)


 svg
      .selectAll("circle")
      .data(data)
      .enter().append("circle") // Enter…
      .attr("cx", function(d) { return 45; })
      .attr("cy", function(d) { return 56; })
      .attr("r", function(d) { return 500; })
      .attr("fill-opacity", .5)
      .attr("fill-opacity", .5)
      .style("z-axis", "89")
      .style("display", "inline")



}

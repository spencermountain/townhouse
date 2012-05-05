
function showstats(){

  get_history(1, function(tabs){
    var html = new EJS({url: './templates/stats_template.ejs'}).render({tabs:tabs});
    $("#stage").html(html);

    var domains=get_domains(tabs)


    var colours = [
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
    domains=domains.map(function(v,i){v.colour=colours[i]; return v;})
    domains=domains.slice(0,10)

    mostgraph(domains)
    timegraph(tabs, domains)
    showfreebase(tabs);
    list_of_googles(tabs);
  })

}


function showdomain(domain){

      chrome.history.search({text:domain, maxResults:2000}, function(tabs){

    var domains=get_domains(tabs)

         console.log(domains);

      });

}




function showfreebase(tabs){
 var days=['mo','tu','we','th','fr','sa','su']
 var topics=[]
 for(var i in tabs){
   if(tabs[i].url.match('https?://en.wikipedia.org/wiki')  && !tabs[i].url.match(/wikipedia\.org\/wiki\/(category|special|user|wp|wikipedia|file):/i) ){
                 //make a freebase id
                 var parsed=parseUri(tabs[i].url);
                 var id=parsed.path.replace('/wiki/','')
                 id=id.replace(/ /g,'_')
                 id="/wikipedia/en/"+mqlkey_quote(id);
                 var d=new Date();
                 d.setTime(tabs[i].lastVisitTime)
                 var title=tabs[i].title.replace(' - Wikipedia, the free encyclopedia','');
                 if(!title||title.match(/(Wikipedia|File)/)){continue}
                   title=title.replace(/ ?\(.*?\)/,'')
                 topics.push({name:title, id:id, day:days[d.getDay()], hour:d.getHours(), date:d.getDate(), url:tabs[i].url})
               }

                 //imdb too
                 if(tabs[i].url.match('https?://imdb.com')){
                     //make a freebase id
                     var parsed=parseUri(tabs[i].url);
                     var id='/authority/imdb'+parsed.path.replace(/\/$/,'');
                     var d=new Date();
                     d.setTime(tabs[i].lastVisitTime);
                     topics.push({name:tabs[i].title, id:id, day:days[d.getDay()], hour:d.getHours(), date:d.getDate(), url:tabs[i].url})
                   }

                 }

                 topics=json_unique(topics, "id");
                 topics=topics.slice(0,10)
                 //render them
                 var html='';
                 for(var i in topics){
                   html+='<a href="'+topics[i].url+'" class="nicelinks" style="font-size:17px;">'+topics[i].name.toLowerCase()+'</a><br/>'
                 }
                 $("#fblist").html(html)

               }

     function todayshow(){
      get_history(1, function(tabs){
        var html='today <br/><span class="number" style="">'+tabs.length+'</span> <br/> pages'
        $("#todayshow").html(html)
      })
    }


  function get_domains(tabs){
        var tablist={};
        for(var i in tabs){
         if(tabs[i].url.match(/^chrome/)){continue;}
         var title=parsetitle(tabs[i].title, tabs[i].url);
         var parsed=parseUri(tabs[i].url);

         var favicon=null;
         if(parsed.host){
           favicon='chrome://favicon/http://'+parsed.host;
         }
         domain=parsed.host.replace(/^www\./,'');
         domain=domain.replace(/\.(org|net|com|co\.uk)/,'');
         domain=domain.replace(/.*?\.(.{4}.*?)/,'$1');//regex subdomain
         if(!title){title=domain;}
         if(tablist[parsed.host] == null){tablist[parsed.host]={favicon:favicon, sites:[], domain:domain, link:'http://'+parsed.host };}
         tablist[parsed.host].sites.push({ url : tabs[i].url, title : title})
       }

      //pivot into an array
      var tabarr=[];
      for(var i in tablist){
        tablist[i].count=tablist[i].sites.length;
        tabarr.push(tablist[i]);
      }
      tabarr.sort(function(a,b){return b.count-a.count;});

      return tabarr;

    }


    function get_history(days, callback){
      if(!days|| days<=0){days=7;}
      d = new Date();
      var now=d.getTime();
      var hours=d.getHours();

      days=days-1;
      d.setDate(d.getDate()-days)
      if(hours<5){      //make the day start at 5am
        d.setDate(d.getDate()-1);
      }
      d.setHours(5);
      var from=d.getTime();

      // console.log(days+ '  from = '+d.getHours()+'    day='+ d.getDate()+'         '+from);

      chrome.history.search({text:'', startTime:from, endTime:now, maxResults:2000}, function(tabs){
        // console.log(tabs.length +' history results');
        return callback(tabs)
      });

    }



//get google searches
function list_of_googles(tabs){
  searches=[]
  for(var i in tabs){
     if(tabs[i].url.match(/google\..*?\/search/)){
       var parsed=parseUri(tabs[i].url);
       var q=parsed.queryKey.q;
       q=decodeURI(q);
       if(q){
        q=q.replace(/\+/g,' ');
        searches.push(q);
      }
    }

}
searches=unique(searches);

//get common terms
var tokens={};
for(var i in searches){
  var chunks=searches[i].split(' ');
  for(var o in chunks){
    if(!tokens[chunks[o]]){
      tokens[chunks[o]]=0;
    }
    tokens[chunks[o]]++
  }
}

//convert to array
var grams=[];
for(var i in tokens){
  grams.push({gram:i, count:tokens[i]})
}
grams=grams.sort(function(a,b){return b.count-a.count;})
grams=_.select(grams,function(g){return g.count>1;})

//augment searches with terms
for(var i in searches){
 var show=searches[i];
 o:for(var o in grams){
  if(show.match(grams[o].gram)){
    var newterm='<b style="font-size:18px;">'+grams[o].gram+'</b>';
    var reg=new RegExp('\\b'+grams[o].gram+'\\b');
    show=show.replace(reg, newterm)
    continue o;
  }
}
searches[i]={show:show, q:searches[i]};
}


//render
var html='';
for(var i in searches){
  html+='<a href="http://google.com/search?q='+searches[i].q+'">'+searches[i].show+'</a><br/>'
}
$("#list_googles").html(html)
//return searches;
}
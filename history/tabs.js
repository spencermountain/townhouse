
function timeline(){
  var tabs=[];

  chrome.windows.getAll({ populate: true }, function(windowlist) {
   for(var i in windowlist){
     for(var o in windowlist[i].tabs){
      if(windowlist[i].tabs[o].pinned==false && windowlist[i].tabs[o].url != "chrome://newtab/"){
        tabs.push(windowlist[i].tabs[o])
      }
    }
  }

  //get visits
  var i=0;
  gettime(i);

  //add more information to each open tab
  function gettime(i){
    chrome.history.getVisits({url:tabs[i].url}, function(visits){
      if(visits[0]){
      visits=visits.sort(function(a,b){return b.visitTime-a.visitTime;})
      tabs[i].lastVisitTime=visits[0].visitTime;
      }
      tabs[i].count=visits.length;
      i++;
      if(tabs[i]){gettime(i);}
      else{
        getclosed(tabs);
      }
    })
  }


  function getclosed(tabs){//get recently closed tabs

    var now=new Date();
    var from=new Date();
    from.setHours(now.getHours()-1);
    from=from.getTime();
    now=now.getTime();

    chrome.history.search({text:'', startTime:from, endTime:now, maxResults:2000}, function(history){
      for(var i in history){
        if(!_.find(tabs, function(tab){return tab.url==history[i].url})){
          history[i].closed=true;
          tabs.push(history[i])
        }
      }
      tabs=tabs.sort(function(a,b){return a.lastVisitTime-b.lastVisitTime});
      //keep only the closed tabs since oldest open tab
      var nice=false; var interesting=[];
      for(var i in tabs){
        if(!tabs[i].closed){nice=true;}
        if(!tabs[i].title){tabs[i].title=tabs[i].url.replace(/https?:\/\/(www\.)?/,'');}
        if(nice){
          interesting.push(tabs[i])
        }
      }
      //make time a ratio
      var start=interesting[0].lastVisitTime;
      for(var i in interesting){
        interesting[i].time=interesting[i].lastVisitTime-start;
      }
      var last=interesting[interesting.length-1].time;
      for(var i in interesting){
        interesting[i].ratio=parseInt((interesting[i].time/last)*100);
        if(interesting[i].ratio>10){interesting[i].ratio=interesting[i].ratio-10;}
      }

//add colours by domain

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

        interesting=interesting.map(function(v){
         v.parsed=parseUri(v.url);
         v.favicon=null;
         if(v.parsed.host){
           v.favicon='chrome://favicon/http://'+v.parsed.host;
         }
         v.domain=v.parsed.host.replace(/^www\./,'');
         v.domain=v.domain.replace(/\.(org|net|com|co\.uk)/,'');
         v.domain=v.domain.replace(/.*?\.(.{4}.*?)/,'$1');//regex subdomain
         return v
        })

        var domains=_.compact(collate(_.pluck(interesting, 'domain')).map(function(v,i ){
          v.colour=colours[i]
          return v
        }))

        interesting=interesting.map(function(v){
          var domain=domains.filter(function(d){
              return d.key == v.domain
            })[0] || {}
            v.colour=domain.colour || "steelblue"
            return v
          })

    var html = new EJS({url: './templates/timeline_template.ejs'}).render({tabs:interesting});
    $('#stage').html(html);

//reset view when closed a tab 'live'
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) { timeline();});



    });

  }

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
        arr.push({title:i, value:obj[i]})
    }
    return arr.sort(function(a,b){return b.value - a.value})
}


function startuptab(){

  chrome.windows.getAll({ populate: true }, function(windowlist) {
    var count=0;
    for(var i in windowlist){
      for(var o in windowlist[i].tabs){
       //close other hometabs
       if( windowlist[i].tabs[o].selected == false){
        if( windowlist[i].tabs[o].url== 'chrome://newtab/'){
         closetab(windowlist[i].tabs[o].id);
       }
       else{
         count++;
       }
     }
   }
 }
 $("#tabshow").html('current<br/><span class="number">'+count+'</span><br/>tabs')
});
}


//current tabs
function showtabs(){
  //get open tabs
  chrome.windows.getAll({ populate: true }, function(windowlist) {
    var tabs=[]
    for(var i in windowlist){
      for(var o in windowlist[i].tabs){
        tabs.push(windowlist[i].tabs[o])
      }
    }
    generic_treemap(tabs);
  })
}

function generic_treemap(tabs){
  var count=0;
  counttab(count);
  function counttab(i){
   chrome.history.getVisits({url: tabs[i].url}, function(visits){
     tabs[i].count=visits.length;
     var parsed=parseUri(tabs[i].url);
     tabs[i].favicon='chrome://favicon/http://'+parsed.host;
     tabs[i].domain=getdomain(tabs[i].url);
     count++;
     if(count<tabs.length && count<250){counttab(count);}//recurse
     else{
      return render(tabs)
    }
  })
 }
}


function getmetas(tabs){
 // return render(tabs,el);

 tabs=_.reject(tabs, function(t){return t.url.match(/chrome/) }  )
 var all=[];
 for(var i in tabs){
  chrome.tabs.sendRequest(tabs[i].id, {greeting: "hello", id:tabs[i].id, url:tabs[i].url, count:tabs[i].url.count, domain:tabs[i].domain}, function(response) {
    all.push(response.data);
    if(all.length==tabs.length){
      render(all, el)
    }
  })
}
}



function render(tabs, el){

  var all={name:"all",
  children:[]
}
var domains=_.pluck(tabs, "domain")
for(var i in domains){
  var domain={name:domains[i],
    children:[]
  }
  for(var o in tabs){
   if(tabs[o].domain && tabs[o].domain==domains[i]){
     //reduce maximum
     if(tabs[o].count>20){
       tabs[o].count=20;
     }
     domain.children.push(tabs[o])
   }
 }
 all.children.push(domain)
}

treemap(all);
}


function getdomain(url, title){
 var parsed=parseUri(url);
 var domain=parsed.host.replace(/^www\./,'');
 domain=domain.replace(/\.(org|net|com|co\.uk)/,'');
 domain=domain.replace(/.*?\.(.{4}.*?)/,'$1');//regex subdomain
 return domain;
}


function closetab(tabId) {
  try {
    chrome.tabs.remove(tabId, function() {});
  } catch (e) {
    alert(e);
  }
  // location.reload();
}




function titlehack(origTitle){
//from readability.js
        var curTitle = origTitle;
        if(curTitle.match(/ [\|\-] /))
        {
            curTitle = origTitle.replace(/(.*)[\|\-] .*/gi,'$1');

            if(curTitle.split(' ').length < 3) {
                curTitle = origTitle.replace(/[^\|\-]*[\|\-](.*)/gi,'$1');
            }
        }
        else if(curTitle.indexOf(': ') !== -1)
        {
            curTitle = origTitle.replace(/.*:(.*)/gi, '$1');

            if(curTitle.split(' ').length < 3) {
                curTitle = origTitle.replace(/[^:]*[:](.*)/gi,'$1');
            }
        }

        curTitle = curTitle.replace( /^\s+|\s+$/g, "" );

        if(curTitle.split(' ').length <= 4) {
            curTitle = null;
        }

    return curTitle
    }

//get a better title from the title tag
function parsetitle(title, url){
 title=title.replace('- Wikipedia, the free encyclopedia','')
 title=title.replace('- Google Search','')

 //remove junk home page titles with domains
 var parsed=parseUri(url);
 if(parsed.directory == '/'){
   return title=parsed.host;
 }

//try readability's algorithm
var trytitle=titlehack(title)
if(trytitle){return trytitle}

 //remove domain stuff from title
 var parts=title.split(/\W[\||\-|—]\W/);
 if(!parts || parts.length<2){return title;}
 //contains domain name
 if(parts[0].match(parsed.host)){return $.trim(parts[1])}
 if(parts[1].match(parsed.host)){return $.trim(parts[0])}
    //pick shorter one
  if(parts[0].length < parts[parts.length-1].length){
   title=parts[parts.length-1]
 }else{
   title=parts[0];
 }
 //truncate long title brutally
 if (title.length > 40){
   var tokens=title.split(' ');
   for(var i in tokens){
     title+=' '+tokens[i];
     if(title.length>40){
       title+='...';
       break
     }
   }
 }
 return $.trim(title);
}



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
       console.log(days+ '  from = '+d.getHours()+'    day='+ d.getDate()+'         '+from);
      chrome.history.search({text:'', startTime:from, endTime:now, maxResults:2000}, function(tabs){
        tabs=tabs.reverse();
        //add some handy data
        tabs=tabs.map(function(v){
           var d=new Date(v.lastVisitTime)
           v.section=d.getHours()*2;
           if(d.getMinutes()>=30){
            v.section+=1;
           }
           v.hour=d.getHours()
           v.minute=d.getMinutes()
           return v
        })
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
return searches;
}

function day_percentage(tabs){
  var sections=unique(tabs.map(function(s){return s.section}))
  return parseInt((sections.length/48)*100)
}


 //remove duplicates from array
 function unique(x) {
   var newArray=new Array();
    label:for(var i=0; i<x.length;i++ ){
      for(var j=0; j<newArray.length;j++ ){
          if(newArray[j]==x[i])
          continue label;
        }
        newArray[newArray.length] = x[i];
      }
    return newArray;
  }


function parseUri (str) {
  var  o   = {
      strictMode: false,
      key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
      q:   {
        name:   "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
      },
      parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
      }
    },
    m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    uri = {},
    i   = 14;
  while (i--) uri[o.key[i]] = m[i] || "";
  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });
  return uri;
};
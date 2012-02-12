      function showimages(){

  //get open tabs
	    chrome.windows.getAll({ populate: true }, function(windowlist) {	    
      var tabs=[]
	       for(var i in windowlist){
	         for(var o in windowlist[i].tabs){
    	         if(windowlist[i].tabs.url=="chrome://newtab"){
    	           if(windowlist[i].tabs.selected){
      	           chrome.tabs.remove(windowlist[i].tabs.id, function(){})
      	           }
      	           continue;
    	         }
	             var parsed=parseUri(windowlist[i].tabs[o].url);
	             windowlist[i].tabs[o].favicon='chrome://favicon/http://'+parsed.host;
	             windowlist[i].tabs[o].domain=getdomain(windowlist[i].tabs[o].url);
	             tabs.push(windowlist[i].tabs[o])
	         }
        }
        var count=0;
        counttab(count);        
        function counttab(i){
           chrome.history.getVisits({url: tabs[count].url}, function(visits){
             tabs[count].count=visits.length;
             count++;
             if(count<tabs.length && count<250){counttab(count);}//recurse
             else{
                getmetas(tabs)
             }
           })
        }        
})
}       


function getmetas(tabs){
  tabs=_.reject(tabs, function(t){return t.url.match(/chrome/) }  )
  var all=[];
  for(var i in tabs){ 
    chrome.tabs.sendRequest(tabs[i].id, {greeting: "hello", id:tabs[i].id, url:tabs[i].url, count:tabs[i].url.count, domain:tabs[i].domain}, function(response) {
      all.push(response.data);
      if(all.length==tabs.length){
        var html='';
        for(var i in all){
          html+="<a href='#' onClick='settab("+all[i].id+")'><img src='"+all[i].image+"' style='max-width:500px; max-height:300px;  border-radius: 15px; opacity:0.5'/></a>";        
        }        
        $("#images").html(html)
      }
    })    
  }
}

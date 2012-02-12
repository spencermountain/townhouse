
function showstats(el, d3){

        get_history(1, function(tabs){
              var html = new EJS({url: './templates/stats_template.ejs'}).render({tabs:tabs});
              el.html(html); 
              
              var domains=get_domains(tabs)
              mostgraph(domains.slice(0,5)) 
              timegraph(tabs)  
              showfreebase(tabs);
       })
       
}

function showfreebase(tabs){

             console.log(tabs.length +' wiki results')
              var days=['mo','tu','we','th','fr','sa','su']
              var topics=[]
                 for(var i in tabs){
                   if(tabs[i].url.match('http://en.wikipedia.org/wiki') && !tabs[i].url.match(/wikipedia\.org\/wiki\/(category|special|user|wp|wikipedia|file):/i) ){
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
console.log(days)
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
          console.log(tabs.length +' history results');              
          return callback(tabs)
      });
          
 }
 

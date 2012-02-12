function recent(tabs){


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
         //domain=domain.replace(/.*?\.(.{4}.*?)/,'$1');//regex subdomain
         if(!title){title=domain;}
         if(tablist[parsed.host] == null){tablist[parsed.host]={favicon:favicon, sites:[], domain:domain };}	             
         tablist[parsed.host].sites.push({ url : tabs[i].url, title : title})	      
      }   
   
      //pivot into an array
      var tabarr=[];
      for(var i in tablist){
        tablist[i].font=parseInt(tablist[i].sites.length/2)+15;
        tabarr.push(tablist[i]);          
      }
    //   tabarr.sort(function(a,b){return b.font-a.font;});              


  return tabarr;

}

function show_domains(){

        get_history(1, function(tabs){
              //tabs=._filter()
              tabs=recent(tabs);
              var googles=list_googles(tabs);
              tabs=tabs.slice(0,25);
            //  googles=googles.slice(0,20);
                    //display history view
                     var template_html = new EJS({url: './templates/find_template.ejs'}).render({tabs:tabs, googles:googles});
                     $('#stage').html(template_html);  
              })

}

      //get google searches            
function list_googles(tabs){
        searches=[]
         for(var i in tabs){
            for(var o in tabs[i].sites){
               if(tabs[i].sites[o].url.match(/google\..*?\/search/)){
                 var parsed=parseUri(tabs[i].sites[o].url);
                 var q=parsed.queryKey.q;
                 q=decodeURI(q);
                 if(q){
                  q=q.replace(/\+/g,' ');
                  searches.push(q);
                 }
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
      console.log(grams)
        
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
     return searches;
}


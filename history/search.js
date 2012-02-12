

function get_search(tabs){

       //get the google searches
      var searchlist=[];
      for(var i in tabs){
       if(tabs[i].url.match(/google\..*?\/search/)){
           var parsed=parseUri(tabs[i].url);
           var q=parsed.queryKey.q;
           q=decodeURI(q);
           if(q){
            tabs[i].q=q;
            searchlist.push(tabs[i]);
           }
       }
      }              
      
      //cluster searches by 20 minute sessions
      var times=[]
      for(var i in searchlist){
        i=parseInt(i)
        if(searchlist[i-1] && searchlist[i-1].lastVisitTime-1200000 < searchlist[i].lastVisitTime){
          times[times.length-1].push(searchlist[i])        
        }
        else{
        times.push([searchlist[i]])
        }      
      } 
      console.log(times)
      
      //searchlist=json_unique(searchlist, 'q')
         
     var template_html = new EJS({url: './templates/search_template.ejs'}).render({items:times});
     $('#search_template').html(template_html);                       
  
      
}


  
 //remove objects with a duplicate field from json 
 function json_unique(x, field) {
   var newArray=new Array();
    label:for(var i=0; i<x.length;i++ ){
      for(var j=0; j<newArray.length;j++ ){ 
          if(newArray[j][field]==x[i][field]) 
          continue label;
        }
        newArray[newArray.length] = x[i];
      }
    return newArray;
  } 



function get_groups(tabs){

var minutes=10;
var milliseconds=minutes*60000;
      
      //order from beginning       
     tabs.reverse();
      
      //cluster searches by 20 minute sessions
      var groups=[{tabs:[]}]
      for(var i in tabs){
        i=parseInt(i)
        if(tabs[i+1] && tabs[i+1].lastVisitTime-milliseconds < tabs[i].lastVisitTime){
          groups[groups.length-1].tabs.push(tabs[i])        
        }
        else{
          groups.push({tabs:[tabs[i]]})
        }      
      }       
      
      //get date
      for(var i in groups){
        var d=new Date()
        d.setTime(groups[i].tabs[0].lastVisitTime);
        var day=d.getDay();
        var weekday=[];
            weekday[0]="Sunday";
            weekday[1]="Monday";
            weekday[2]="Tuesday";
            weekday[3]="Wednesday";
            weekday[4]="Thursday";
            weekday[5]="Friday";
            weekday[6]="Saturday";
        var hour=d.getHours();
        if(hour>=13){
          hour=hour-12;  
          }
        groups[i].day=weekday[d.getDay()]
        groups[i].time=hour+':00';      
      }
      
      //get searches      
      for(var i in groups){
        groups[i].searches=[]
         for(var o in groups[i].tabs){
           if(groups[i].tabs[o].url.match(/google\..*?\/search/)){
             var parsed=parseUri(groups[i].tabs[o].url);
             var q=parsed.queryKey.q;
             q=decodeURI(q);
             if(q){
              groups[i].tabs[o].q=q;
              groups[i].searches.push(q);
             }
            }     
          }
        groups[i].searches=unique(groups[i].searches);
        groups[i].searches.sort(function(a,b){return a.length -b.length;})
     }
      
      
      console.log(groups)
      
      //tabs=json_unique(tabs, 'q')
         
     var template_html = new EJS({url: './templates/group_template.ejs'}).render({items:groups});
     $('#group_template').html(template_html);                       
  
      
}

//var searches=['raymond vaver', 'johnny foo is good', 'raymond ee', 'poo foo'];
//var fruitOfTheDay = fruitArray[Math.floor(Math.random() * fruitArray.length)];


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

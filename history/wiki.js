

function get_wiki(days){
      get_topics(days, function(topics){
             //collect by day..
             var days=[]
             for(var i in topics){
               if(days.length==0 ||  topics[i].day!=days[days.length-1].name){
                  days.push({name:topics[i].day, topics:[]})
               }
               days[days.length-1].topics.push(topics[i])
             }
             console.log(days)
        var template_html = new EJS({url: './templates/wiki_template.ejs'}).render({days:days, topics:topics});
         $('#stage').html(template_html);
            weekgraph();
        setTimeout("removeblanks()",1000);
      })

}

function get_topics(days, callback){
    d = new Date();
    today=d.getTime();
    d.setDate(d.getDate()-days);
    var hours=d.getHours();
    if(hours<5){      //make the day start at 5am
        d.setDate(d.getDate()-1);
    }
    d.setHours(5);
    var from=d.getTime();
    console.log('from = '+from);

          chrome.history.search({text:'Wikipedia - the free encyclopedia' ,  startTime:from, endTime:today, maxResults:100}, function(tabs){
             console.log(tabs.length +' wiki results')
              var days=['mo','tu','we','th','fr','sa','su']
              var topics=[]
                 for(var i in tabs){
                   if(tabs[i].url.match('http://en.wikipedia.org/wiki') && !tabs[i].url.match(/wikipedia\.org\/wiki\/(category|special|user|wp|wikipedia):/i) ){
                   //make a freebase id
                   var parsed=parseUri(tabs[i].url);
                     var id=parsed.path.replace('/wiki/','')
                     id=id.replace(/ /g,'_')
                     id="/wikipedia/en/"+mqlkey_quote(id);
                     var d=new Date();
                     d.setTime(tabs[i].lastVisitTime)
                     var title=tabs[i].title.replace(' - Wikipedia, the free encyclopedia','');
                     title=title.replace(/ ?\(.*?\)/,'')
                     topics.push({name:title, id:id, day:days[d.getDay()], hour:d.getHours(), date:d.getDate()})
                   }
                 }
                 topics=json_unique(topics, "id");
          return callback(topics);
          });

 }

      function removeblanks(){
      $("img").each(function(){
        if($(this).css('width')=='1px'){
          $(this).parents('.topic').remove();console.log('eee')
        }
      });
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

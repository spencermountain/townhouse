function showslideshow(){

 $("#stage").html('<input type="hidden" value="yeah" id="slidestill"/><span id="slide"></span>');

//get past 20 days of topics
  get_topics(20, function(topics){
  console.log(topics.length) 
    topics=kill_dupes(topics,'id')
    console.log(topics.length)
    console.log(topics)    
     if(topics.length<4){return}
      var i=0;
        var refreshId = setInterval(function() {
        
        if($("#slidestill").val()!='yeah'){
        clearInterval(refreshId);
        }
        
          if(!topics[i]){i=0;}
          //$("#stage").html(topics[i].name);
           gettopic(topics[i].id, console.log);
           console.log(topics[i].id);
           i++;
        }, 15000); //60000ms equals 1 minute

  })
}

  //remove objects with a duplicate field from json
  function kill_dupes(a, field) {
      var r = new Array();
      o: for (var i = 0, n = a.length; i < n; i++) {
          for (var x = 0, y = r.length; x < y; x++) {
              if (r[x][field] == a[i][field]) {              
                              console.log('--------'+r[x][field])
                 // r[x].count += 1;
                  continue o;
              }
          }
          r[r.length] = a[i];
      }
      return r;
  }

function gettopic(id, callback){
   query = [{
                      "id":    id,
                      "type":  "/common/topic",
                      "article": [{
                        "text": {
                          "chars":     null,
                          "maxlength": 500
                        }
                      }],
                      "name":  null,
                      "limit": 1,
                      "image": [{
                        "limit": 1,
                        "id":    null
                      }]
                    }];
   query_envelope = {'query' : query, 'extended':true};
   service_url = 'http://api.freebase.com/api/service/mqlread';
   url = service_url  + '?callback=?&query=' + encodeURIComponent(JSON.stringify(query_envelope));
   $.getJSON(url, function(response) {
      console.log(response);
      if(!response.result[0]){return;}
      $('#slide').fadeOut('slow',function(){
        $(this).html('');
        var html='';
        html+='<table><tr><td>';
        html+='<span style="font-size:15px;"><a href="http://thekeep.freebaseapps.com/wiki?id='+response.result[0].id+'">'+response.result[0].name+'</a></span>';
        html+='<ul style="width:200px; font-size:12px;">';
        if(response.result[0].article[0]){
          html+=response.result[0].article[0].text.chars.replace(/ ?\(.{0,400}?\)/g, ' ');
        }
        html+='</ul></td>';
        html+='<td>'
        if(response.result[0].image[0]){
          html+='<a href="http://thekeep.freebaseapps.com/wiki?id='+response.result[0].id+'"><img style="border-radius:15px; opacity:0.8;" src="http://www.freebase.com/api/trans/image_thumb'+response.result[0].image[0].id+'?maxwidth=300&maxheight=300&errorid=/m/0djw4wd"/></a>';
        }
        html+='</td></tr></table>'
        $("#slide").html(html);
        $("#slide").fadeIn('slow');
      });
   });
 
 }

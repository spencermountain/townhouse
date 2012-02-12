

function showapps(el){
  var apps=[];
  chrome.management.getAll(function(extensions){
      for(var i in extensions){
        if(extensions[i].isApp==true){
          apps.push(extensions[i])  
        }
      }
      console.log(apps)
       var template_html = new EJS({url: './templates/apps_template.ejs'}).render({apps:apps});
       el.html(template_html);  
      
    });
    }

function startapps(){
  var count=0;
  chrome.management.getAll(function(extensions){
      var  html='apps<br/>';
      for(var i in extensions){
        if(extensions[i].isApp==true){
          html+='<img style="width:30px; height:30px; opacity:0.4; vertical-align:bottom; border-radius:5px;" src="'+extensions[i].icons[extensions[i].icons.length-1].url+'"/>';
          count++;
          if(count>=4){break;}
          if(count==2){html+='<br/>';}          
        }
      }      
      $("#appshow").html('<div style="vertical-align:bottom">'+html+'</div>');
      })

}


function showapps(){
  var apps=[];
  chrome.management.getAll(function(extensions){
      for(var i in extensions){
        if(extensions[i].isApp==true){
          apps.push(extensions[i])
        }
      }
      apps.push({name:'Manage apps', icons:[{url:'./manage.png'}], appLaunchUrl:'chrome://extensions'})
       var template_html = new EJS({url: './templates/apps_template.ejs'}).render({apps:apps});
       $("#stage").html(template_html);

    });
    }



function startapps(){


  var html='<br/><img style="opacity:0.9;" src="./manage.png"/><br/>apps'
      $("#appshow").html('<div style="vertical-align:bottom">'+html+'</div>');

  // var count=0;
  // chrome.management.getAll(function(extensions){
  //   extensions=extensions.reverse()
  //     var  html='apps<br/>';
  //     for(var i in extensions){
  //       if(extensions[i].isApp==true){
  //         html+='<img style="width:30px; height:30px; opacity:0.4; vertical-align:bottom; border-radius:5px;" src="'+extensions[i].icons[extensions[i].icons.length-1].url+'"/>';
  //         count++;
  //         if(count>=4){break;}
  //         if(count==2){html+='<br/>';}
  //       }
  //     }
  //     $("#appshow").html('<div style="vertical-align:bottom">'+html+'</div>');
  //     })

}

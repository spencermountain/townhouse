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
         domain=domain.replace(/.*?\.(.{4}.*?)/,'$1');
         if(!title){title=domain;}
         if(tablist[parsed.host] == null){tablist[parsed.host]={favicon:favicon, sites:[], domain:domain };}	             
         tablist[parsed.host].sites.push({ url : tabs[i].url, title : title})	      
      }   
   
      //pivot into an array
      var tabarr=[];
      for(var i in tablist){
        tablist[i].font=tablist[i].sites.length+15;
        tabarr.push(tablist[i]);          
      }
      //  tabarr.sort(function(a,b){return b.font-a.font;});              
      //display history view
     // $('#historylist').html('');
      //$('#historytemplate').mustache({tabs:tabarr}).appendTo('#historylist');
             

         
     var template_html = new EJS({url: './templates/domain_template.ejs'}).render({tabs:tabarr});
     $('#domain_template').html(template_html);  








}


	          //localstorage i/o
        function showtopics(el) {
	        var data = localStorage["learn"]||'[]';
	        data=JSON.parse(data);	
	        console.log('loading topics')
	        console.log(data)
	        
	        var template_html = new EJS({url: './templates/topic_template.ejs'}).render({tabs:data});
         el.html(template_html);  
         }
      	     
	          //make a url into a saved topic
       function keep(url, title){
           var url="http://thekeep.freebaseapps.com/uri_recon?callback=?&url="+url;     //send url to freebase	    
           $.getJSON(url, function(data) {
              alert(JSON.stringify(data));
              addnew(data);                       
           });
       }

        function addnew(obj) { 
        console.log(obj)
	        var old = localStorage["learn"] || '[]';
	        old=JSON.parse(old);
	        for(var i in old){
	          if(old[i].link==obj.link){console.log(obj.url+'   - exists');return false; }
	        }
	        old.unshift(obj);
	        localStorage["learn"] = JSON.stringify(old);	
	        rendertopics();
	        location.reload();
        }


        function erasetopics() {
	        localStorage.removeItem("learn");	
	        localStorage["learn"] = JSON.stringify([]);
	        location.reload();
        }
        

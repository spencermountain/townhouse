

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    console.log( "incontent script:" );
    
    if (request.greeting == "hello"){
     
   var data={id:request.id, url:request.url, count:request.count, domain:request.domain};
  data.title=$("title").text();
  $("meta").each(function(){
        var name=$(this).attr('name');
        if(!name){name=$(this).attr('property');}
        if(!name){return true;}//continue
        name=name.toLowerCase();
        if(name=="description" || name=="og:description"){
          data.description=$(this).attr('content');
        }
       if(name=="keywords"){
          data.keywords=$(this).attr('content').split(/, ?/);
        }
       if(name=="date" || name=="OriginalPublicationDate" || name=="LastModifiedDate"){
          data.date=$(this).attr('content');
        }
       if(name=="author"){
          data.author=$(this).attr('content');
        }
       if(name=="og:site_name"){
          data.publisher=$(this).attr('content');
        }
       if(name=="og:image"){
          data.image=$(this).attr('content');
        }
       if(name=="og:title"){
          data.title=$(this).attr('content');
        }
  });
          
      sendResponse({farewell: "goodbye", data:data});
      }
    else{
      sendResponse({empy:true}); // snub them.
      }
  });
  
  console.log('loaded toast')
  

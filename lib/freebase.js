//reconcile the domain against its freebase topic


function dodomain(domain){
$("#stage").html('<table style="width:99%; text-align:center; padding:15px;"><tr><td style="width:150px;"><span id="domainhistory"></span></td>'
                 +'<td><span id="domaininfo">dd</span></td>'
                 +'</tr><tr>'
                 +'<Td></td>'
                 +'<td><span id="domainrecent"></span></td>'
                 +'</tr></table>')

domaininfo(domain)
domainstats(domain)
}

function domaininfo(domain){
  if(domain){
    var url='http://jsonp.freebaseapps.com/townhouse_link?url='+encodeURIComponent(domain)+'&callback=?'
  $.getJSON(url, function(result) {
    console.log('freebase result')
    if(result[0]){
      var html='<img style="opacity: 0.9;-moz-border-radius: 5px; top:0px; border-radius: 5px;" src="http://www.freebase.com/api/trans/image_thumb'+result[0].mid+'?mode=fillcropmid&maxwidth=150&maxheight=150&errorid=/m/0djw4wd" />'
      +'<span style="display:inline-block;max-width:350px;">'+result[0].description+'</span>'
     $("#domaininfo").html(html)
    }else{
      $("#domaininfo").html(domain)
    }
   });
  }
}

function domainstats(domain){
      chrome.history.search({text:domain, maxResults:2000}, function(tabs){
        console.log(tabs)
         var html='<h2><a href="'+domain+'">'+domain.replace(/https?:\/\//,'')+'</a></h2>domain visited '+tabs.length+'times '
         +'<p></p>'
       $("#domainhistory").html(html)
       var html=tabs.slice(0,5).map(function(v){return '<span style="background:steelblue;  border-radius: 5px; padding:1px; color:white;">'+v.title.substr(0,100)+'</span>'}).join('<br/><br/>')
       $("#domainrecent").html(html)
      });

}


$(document).ready(function() {


  var homeid = '';
  chrome.tabs.getCurrent(function(tab) {
    homeid = tab.id;
  })

  var refreshId = setInterval(function() {
    chrome.tabs.getSelected(null, function(tab) {
      if (tab.id != homeid && tab.status == "complete") {
        chrome.tabs.remove(homeid, function() {})
      }
    })
  }, 60000); //60000ms equals 1 minute

  var slideshow_timeout = window.setTimeout(function() {
    showslideshow()
  }, 238000);

  $(document).click(function() {
    window.clearTimeout(slideshow_timeout);
    slideshow_timeout = window.setTimeout(function() {
      showslideshow()
    }, 238000);
    console.log('click');
  })


  $("#tabshow").click(function() {
    //showtabs();
    timeline()
  });
  $("#subjectshow").click(function() {
    get_wiki(7);
  });
  $("#show").click(function() {
    showslideshow();
  });
  $("#appshow").click(function() {
    showapps();
  });
  $("#findshow").click(function() {
    show_domains();
  });
  $("#todayshow").click(function() {
    showstats();
  });

  todayshow();
  showimages();
  setTimeout("removeblanks()", 1000);
  startuptab();
  startapps()
  dotextarea()

  //esc key closes
  $(document).keyup(function(e) {
    console.log(e.keyCode)
    if (e.keyCode == 27) {
      dotextarea()
    }
  })

  $(".foot").hover(
    function() {
      $(this).addClass("foothover");
    },
    function() {
      $(this).removeClass("foothover");
    }
  );

  //bottom pie graph
  get_history(1, function(tabs) {
    var domains = get_domains(tabs)
    showpie(domains)
    timegraph(tabs)
  })

});

function settab(id) {
  chrome.tabs.update(id, {
    selected: true
  });
}
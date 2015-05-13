$( document ).ready ->

  georgia= 'font-family: "Big Caslon", "Book Antiqua", "Palatino Linotype", Georgia, serif;'
  calibri= 'font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;'
  window.blue= colourscheme.blues(0.6)
  window.notblue= colourscheme.browns(0.6)

  close_others=->
    obj= {
      active:false
      pinned:false
      currentWindow:true
      url:"chrome://newtab/"
    }
    chrome.tabs.query obj, (tabs)->
      tabs.forEach (t)->
        chrome.tabs.remove(t.id)

  window.get_times=->
    morning = new Date()
    if morning.getHours() < 8
      morning.setDate morning.getDate() - 1
    morning.setHours(7)
    morning.setMinutes(1)
    morning= morning.getTime()

    now = new Date().getTime()

    night= new Date()
    night.setHours(23)
    night.setMinutes(59)
    night= night.getTime()

    day= new Date().getDay()
    workday= !(day==0 || day==6)
    {
      morning:morning,
      now:now,
      night:night,
      delta_now: now - morning,
      delta_day: night - morning,
      workday: workday
    }

  today_pages=(cb=->)->
    #get this morning's time
    times= get_times()

    chrome.history.search
      text: ""
      startTime: times.morning;
      endTime: times.now;
      maxResults: 2000
    , (tabs) ->
      #print-out count
      $("#pagecount").html("#{tabs.length} pages")

      tabs= tabs.reverse()
      cb(tabs)


  # googles= (tabs)->
  #   urls= tabs.map (t)->t.url
  #   urls= urls.filter (u)-> u.match(/\.google\./)
  #   googles= []
  #   urls.forEach (u)->
  #     p = parseUri(u)
  #     # if p.hostname.match(/^(www\.)google\./)


  # $("#pagecount").css('color', blue)

  close_others()

  today_pages (tabs)->
    timeline(tabs, $("#timeline"))
    # googles(tabs)

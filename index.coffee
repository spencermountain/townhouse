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
    morning.setMinutes(50)
    morning= morning.getTime()

    now = new Date().getTime()

    night= new Date()
    night.setHours(23)
    night.setMinutes(0)
    night= night.getTime()
    {
      morning:morning,
      now:now,
      night:night,
      delta_now: now - morning,
      delta_day: night - morning
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
      $("#pagecount").html(tabs.length)

      tabs= tabs.reverse()
      cb(tabs)



  $("body").html(
    """
    <div id="timeline" style="position:absolute; margin:0px 10% 0px 10%; width:80%; bottom:120px; text-align:center;">
    </div>

    <table style="position:absolute; margin:0px; width:90%; bottom:70px; color:grey; text-align:center; min-width:200px;">
      <tr>

        <td style="width:200px;" >
          <div style="font-size:69px;" id="pagecount">
            0
          </div>
          <span style="display:inline-block; padding:3px; color:white; color:#{blue}; font-size:20px;">
            pages
          </span>
          <div style="font-size:15px; color:grey;">
            since 8am
          </span>
        </td>

        <td id="timecount" style="width:200px;" >
        </td>

        <td style="width:200px;" id="">
        </td>
        <td style="width:200px;" id="">
        </td>
      </tr>
    </table>
    <div id="color1" style="position:absolute; width:100px; height:28px; bottom:30px; border-radius:3px 3px 3px 3px; left:100px; background-color:#{blue}; "></div>
    <div id="color2" style="position:absolute; width:75px; height:20px; bottom:24px; border-radius:3px 3px 3px 3px; left:150px; background-color:#{notblue}; "></div>
    """
  )
  close_others()

  today_pages (tabs)->
    timeline(tabs, $("#timeline")[0])

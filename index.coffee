arr= [
  "./libs/jquery.js",
  "./libs/sugar.js",
  # "./libs/oj.js",
  "./libs/easings.js",
  "./libs/dirty.js",
  "./libs/d3.js",
  "./libs/colour.js",
  "./coffeejs/timeline.js",
]
head.js.apply(this, arr);

head ->
  # oj.useGlobally();

  georgia= 'font-family: "Big Caslon", "Book Antiqua", "Palatino Linotype", Georgia, serif;'
  calibri= 'font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;'
  window.blue= colourscheme.blues(0.6)
  window.notblue= colourscheme.browns(0.6)

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

      duration= 900000 #15minutes=900,000ms
      sessions= []
      tabs= tabs.reverse()
      cb(tabs)



  $("body").html(
    """
    <div id="timeline" style="position:absolute; margin:0px 10% 0px 10%; width:90%; bottom:100px; text-align:center;">
    </div>

    <table style="position:absolute; margin:5%; width:90%; bottom:0px; color:grey; text-align:center;">
      <tr>

        <td style="width:200px;" >
          <div style="font-size:69px;" id="pagecount">
            80
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
    <div id="color1" style="position:absolute; width:150px; height:30px; bottom:20px; border-radius:3px 3px 7px 3px; left:100px; background-color:#{blue}; "></div>
    <div id="color2" style="position:absolute; width:100px; height:25px; bottom:10px; border-radius:3px 3px 7px 3px; left:200px; background-color:#{notblue}; "></div>
    """
  )
  today_pages (tabs)->
    timeline(tabs, $("#timeline")[0])
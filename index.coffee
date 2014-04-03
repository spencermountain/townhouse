arr= [
  "./libs/jquery.js",
  "./libs/sugar.js",
  # "./libs/oj.js",
  "./libs/easings.js",
  "./libs/dirty.js",
  "./libs/d3.js",
  "./libs/colour.js",
]
head.js.apply(this, arr);

head ->
  # oj.useGlobally();

  georgia= 'font-family: "Big Caslon", "Book Antiqua", "Palatino Linotype", Georgia, serif;'
  calibri= 'font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;'


  today_pages=()->
    #get this morning's time
    morning = new Date()
    if morning.getHours() < 8
      morning.setDate morning.getDate() - 1
    morning.setHours(8)
    morning.setMinutes(0)

    chrome.history.search
      text: ""
      startTime: morning.getTime();
      endTime: new Date().getTime();
      maxResults: 2000
    , (tabs) ->
      #print-out count
      $("#pagecount").html(tabs.length)

      duration= 900000 #15minutes=900,000ms
      sessions= []
      tabs= tabs.reverse()
      console.log(tabs[1])



  $("body").html(
    """
    <table style="position:absolute; margin:5%; width:90%; bottom:0px; color:grey; text-align:center;">
      <tr>

      <td style="width:200px;" >
        <div style="font-size:69px;" id="pagecount">
          80
        </div>
        <span style="display:inline-block; padding:3px; color:white; background-color:#{colourscheme.bluebrowns(0.6)}; font-size:20px;">
          pages
        </span>
        <div style="font-size:15px; color:grey;">
          since 8am
        </span>
      </td>

      <td style="width:200px;" >
        <div style="font-size:69px;" id="timecount">
          3
        </div>
        <span style="font-size:20px; color:grey;">
          hours
        </span>
        <div style="font-size:15px; color:grey;">
          on the internet
        </span>
      </td>


        <td style="width:200px;" id="">
        </td>
        <td style="width:200px;" id="">
        </td>
      </tr>
    </table>
    """
  )
  today_pages()
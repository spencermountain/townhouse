
timeline= (tabs=[], el, options={})->
  start= tabs[0].lastVisitTime
  current_end= tabs[0].lastVisitTime

  window.svg = d3.select(el[0]).append("svg:svg")
  .attr("height", 150 )
  .attr("width", el.width() )
  # .style("border","1px solid grey")
  width= $("svg").width()
  if width > 800
    width= 800
  if width < 200
    width= 200
  y= 50
  times= get_times()
  console.log(times)
  buffer= 900000 #15 mins
  scale = d3.scale.linear().domain([times.morning-buffer, times.night+buffer]).range([0, width])

  #dayline
  line = svg.append("svg:line")
  .attr('x1', (d)-> scale(times.morning) )
  .attr('y1', y)
  .attr('x2', (d)-> scale(times.night) )
  .attr('y2', y)
  .style("stroke", "lightgrey")
  .style("stroke-width", 2)

  #nowline
  line = svg.append("svg:line")
  .attr('x1', (d)-> scale(times.morning) )
  .attr('y1', y)
  .attr('x2', (d)-> scale(times.now) )
  .attr('y2', y)
  .style("stroke", blue)
  .style("stroke-width", 2)

  #workline
  if times.workday
    line = svg.append("svg:line")
    .attr('x1', ()->
      t= new Date(times.morning)
      t.setHours(9)
      t.setMinutes(0)
      scale(t.getTime())
    )
    .attr('y1', y)
    .attr('x2', (d)->
      t= new Date(times.morning)
      t.setHours(17)
      t.setMinutes(0)
      scale(t.getTime())
    )
    .attr('y2', y)
    .style("stroke", notblue)
    .style("stroke-width", 1)

  axis= [
    {
      label:"8am",
      hour:8
    },
    {
      label:"noon",
      hour:12
    },
    {
      label:"5pm",
      hour:17
    },
    {
      label:"8pm",
      hour:20
    },
  ]
  axis.forEach (a)->
    d= new Date(times.morning)
    d.setHours(a.hour)
    d.setMinutes(5)
    t= d.getTime()
    b= 300000 #6mins
    # svg.append("svg:line")
    # .attr('x1', (d)-> scale(t) )
    # .attr('y1', y-15)
    # .attr('x2', (d)-> scale(t) )
    # .attr('y2', y-20)
    # .style("stroke", "lightgrey")
    # .style("stroke-width", 1)

    label= svg.append("text")
    .text(a.label)
    .attr('x', (d)->scale(t-b))
    .attr('y', y-5)
    .style('fill','grey')
    .attr('font-family', 'Georgia, serif')
    .attr('font-size', '10px')

  sessions= []
  # duration= 450000 #7 mins
  duration= 900000 #15 mins

  for t,i in tabs
    if t.lastVisitTime > current_end+duration || !tabs[i+1]
      sessions.push({
        start:new Date(start),
        end:new Date(current_end+duration),
        duration: (current_end+duration) - start
        })
      start= t.lastVisitTime
      current_end= t.lastVisitTime
    else
      current_end= t.lastVisitTime

  sessions.forEach (s)->
    svg.append("svg:line")
    .attr('x1', (d)-> scale(s.start) )
    .attr('y1', y+7)
    .attr('x2', (d)-> scale(s.end) )
    .attr('y2', y+7)
    .style("stroke", "steelblue")
    .style("stroke-width", 5)
  combined_durations= sessions.map((s)->s.duration).reduce (a, b)->
    a + b
  seconds= combined_durations / 1000
  minutes= seconds/60
  hours= (minutes/60).toFixed(0)
  render_timecount(hours)

render_timecount= (hours)->
  if hours>1
    h= """
      <span style="font-size:16px; color:#{blue};">
        #{hours}
      </span>
      <span style="font-size:15px; color:grey;">
        hours on the internet
      </span>
    """
    $("#timecount").html(h)

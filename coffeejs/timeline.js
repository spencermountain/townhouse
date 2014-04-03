// Generated by CoffeeScript 1.6.3
var render_timecount, timeline;

timeline = function(tabs, el, options) {
  var axis, buffer, combined_durations, current_end, duration, hours, i, line, minutes, scale, seconds, sessions, start, t, times, y, _i, _len;
  if (tabs == null) {
    tabs = [];
  }
  if (options == null) {
    options = {};
  }
  console.log(tabs[1]);
  window.svg = d3.select(el).append("svg:svg").attr("height", 150);
  y = 50;
  times = get_times();
  buffer = 900000;
  scale = d3.scale.linear().domain([times.morning - buffer, times.night + buffer]).range([0, 800]);
  line = svg.append("svg:line").attr('x1', function(d) {
    return scale(times.morning);
  }).attr('y1', y).attr('x2', function(d) {
    return scale(times.night);
  }).attr('y2', y).style("stroke", "lightgrey").style("stroke-width", 2);
  line = svg.append("svg:line").attr('x1', function(d) {
    return scale(times.morning);
  }).attr('y1', y).attr('x2', function(d) {
    return scale(times.now);
  }).attr('y2', y).style("stroke", blue).style("stroke-width", 2);
  line = svg.append("svg:line").attr('x1', function() {
    var t;
    t = new Date(times.morning);
    t.setHours(9);
    t.setMinutes(0);
    return scale(t.getTime());
  }).attr('y1', y - 4).attr('x2', function(d) {
    var t;
    t = new Date(times.morning);
    t.setHours(17);
    t.setMinutes(0);
    return scale(t.getTime());
  }).attr('y2', y - 4).style("stroke", notblue).style("stroke-width", 1);
  axis = [
    {
      label: "8:00",
      hour: 8
    }, {
      label: "noon",
      hour: 12
    }, {
      label: "5:00",
      hour: 17
    }, {
      label: "8:00",
      hour: 20
    }
  ];
  axis.forEach(function(a) {
    var b, d, label, t;
    d = new Date(times.morning);
    d.setHours(a.hour);
    d.setMinutes(5);
    t = d.getTime();
    b = 300000;
    svg.append("svg:line").attr('x1', function(d) {
      return scale(t);
    }).attr('y1', y - 7).attr('x2', function(d) {
      return scale(t);
    }).attr('y2', y - 20).style("stroke", "lightgrey").style("stroke-width", 1);
    return label = svg.append("text").text(a.label).attr('x', function(d) {
      return scale(t - b);
    }).attr('y', y - 25).style('fill', 'grey').attr('font-family', 'Georgia, serif').attr('font-size', '10px');
  });
  sessions = [];
  duration = 900000;
  start = tabs[0].lastVisitTime;
  current_end = tabs[0].lastVisitTime;
  for (i = _i = 0, _len = tabs.length; _i < _len; i = ++_i) {
    t = tabs[i];
    if (t.lastVisitTime > current_end + duration || !tabs[i + 1]) {
      sessions.push({
        start: new Date(start),
        end: new Date(current_end + duration),
        duration: (current_end + duration) - start
      });
      start = t.lastVisitTime;
      current_end = t.lastVisitTime;
    } else {
      current_end = t.lastVisitTime;
    }
  }
  console.log(tabs.length + " tabs");
  console.log("into " + sessions.length + " sessions");
  sessions.each(function(s) {
    return svg.append("svg:line").attr('x1', function(d) {
      return scale(s.start);
    }).attr('y1', y + 7).attr('x2', function(d) {
      return scale(s.end);
    }).attr('y2', y + 7).style("stroke", "steelblue").style("stroke-width", 5);
  });
  combined_durations = sessions.map('duration').sum();
  seconds = combined_durations / 1000;
  minutes = seconds / 60;
  hours = (minutes / 60).toFixed(1);
  console.log("" + hours + " hours");
  return render_timecount(hours);
};

render_timecount = function(hours) {
  var h;
  if (hours > 1) {
    h = "<div style=\"font-size:69px;\" >\n  " + hours + "\n</div>\n<span style=\"font-size:20px; color:" + blue + ";\">\n  hours\n</span>\n<div style=\"font-size:15px; color:grey;\">\n  on the internet\n</span>";
    return $("#timecount").html(h);
  }
};
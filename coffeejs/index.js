// Generated by CoffeeScript 1.6.3
var arr;

arr = ["./libs/jquery.js", "./libs/sugar.js", "./libs/easings.js", "./libs/dirty.js", "./libs/d3.js", "./libs/colour.js", "./coffeejs/timeline.js"];

head.js.apply(this, arr);

head(function() {
  var calibri, georgia, today_pages;
  georgia = 'font-family: "Big Caslon", "Book Antiqua", "Palatino Linotype", Georgia, serif;';
  calibri = 'font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;';
  window.blue = colourscheme.blues(0.6);
  window.notblue = colourscheme.browns(0.6);
  window.get_times = function() {
    var morning, night, now;
    morning = new Date();
    if (morning.getHours() < 8) {
      morning.setDate(morning.getDate() - 1);
    }
    morning.setHours(7);
    morning.setMinutes(50);
    morning = morning.getTime();
    now = new Date().getTime();
    night = new Date();
    night.setHours(23);
    night.setMinutes(0);
    night = night.getTime();
    return {
      morning: morning,
      now: now,
      night: night,
      delta_now: now - morning,
      delta_day: night - morning
    };
  };
  today_pages = function(cb) {
    var times;
    if (cb == null) {
      cb = function() {};
    }
    times = get_times();
    return chrome.history.search({
      text: "",
      startTime: times.morning,
      endTime: times.now,
      maxResults: 2000
    }, function(tabs) {
      var duration, sessions;
      $("#pagecount").html(tabs.length);
      duration = 900000;
      sessions = [];
      tabs = tabs.reverse();
      return cb(tabs);
    });
  };
  $("body").html("<div id=\"timeline\" style=\"position:absolute; margin:0px 10% 0px 10%; width:90%; bottom:100px; text-align:center;\">\n</div>\n\n<table style=\"position:absolute; margin:5%; width:90%; bottom:0px; color:grey; text-align:center;\">\n  <tr>\n\n    <td style=\"width:200px;\" >\n      <div style=\"font-size:69px;\" id=\"pagecount\">\n        80\n      </div>\n      <span style=\"display:inline-block; padding:3px; color:white; color:" + blue + "; font-size:20px;\">\n        pages\n      </span>\n      <div style=\"font-size:15px; color:grey;\">\n        since 8am\n      </span>\n    </td>\n\n    <td id=\"timecount\" style=\"width:200px;\" >\n    </td>\n\n    <td style=\"width:200px;\" id=\"\">\n    </td>\n    <td style=\"width:200px;\" id=\"\">\n    </td>\n  </tr>\n</table>\n<div id=\"color1\" style=\"position:absolute; width:150px; height:30px; bottom:20px; border-radius:3px 3px 7px 3px; left:100px; background-color:" + blue + "; \"></div>\n<div id=\"color2\" style=\"position:absolute; width:100px; height:25px; bottom:10px; border-radius:3px 3px 7px 3px; left:200px; background-color:" + notblue + "; \"></div>");
  return today_pages(function(tabs) {
    return timeline(tabs, $("#timeline")[0]);
  });
});

//let the color change by sunlight

$(document).ready(function(){
$("#hour").keyup(function(){
var d = new Date();
var hour=d.getHours();
var hour=parseInt($("#hour").val());

//defaults
var hue=217;
var niceness=15;//5 is cloudy, 20 is nice
//darkness
var midnight=15;//the lowest light allowed
var noon=80;//the most light allowed
var afternoon=50;

var hours={
5:midnight+10,
6:midnight+20,
7:midnight+30,
8:midnight+65,
9:midnight+85,
10:midnight+85,
11:midnight+85,
12:midnight+85,
13:midnight+55,
14:midnight+55,
15:midnight+55,
16:midnight+35,
17:midnight+30,
18:midnight+25,
19:midnight+15,
20:midnight+10,
21:midnight+5,
}

var fontcolor='light'
var darkness=hours[hour]
if(!darkness){darkness=midnight;}
if(darkness>midnight+45){
  fontcolor='dark';
}


/*
if(hour<=9 && hour>=6){//between 6 to 9 go from 20 to 80
 var darkness=(hour-5)*10;
 if(darkness<=midnight){darkness=midnight;}
}
else if(hour>9 && hour<=15){//between 1 and 3, go blue, from 80 to 50
  var darkness=(hour-9)*-10;
  darkness+=50;
}
else if(hour>18){ //between 6pm to 9 go from 50 to 20
 var darkness=(hour-18)*-10;
 darkness+=noon;
 if(darkness<=midnight){darkness=midnight;}
}
else{darkness=afternoon;}*/


console.log('hour is'+hour+'darkness:'+darkness);
$("body").css("background" , 'hsl('+hue+','+niceness+'%,'+darkness+'%)');
})
});

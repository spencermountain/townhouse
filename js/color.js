//let the color change by sunlight
function do_colour(){
var d = new Date();
var hour=d.getHours();
//defaults
var hue=217;
var niceness=20;//5 is cloudy, 20 is nice
//darkness
var midnight=15;//the lowest light allowed
var noon=80;//the most light allowed
var afternoon=50;

hour=15;
var hours={
	5:midnight+10,
	6:midnight+20,
	7:midnight+30,
	8:midnight+65,
	9:midnight+65,
	10:midnight+55,
	11:midnight+55,
	12:midnight+55,
	13:midnight+55,
	14:midnight+55,
	15:midnight+45,
	16:midnight+35,
	17:midnight+30,
	18:midnight+25,
	19:midnight+15,
	20:midnight+10,
	21:midnight+5,
}
var darkness=hours[hour]
if(!darkness){darkness=midnight;}
//console.log('hour is'+hour+'darkness:'+darkness);
$("body").css("background" , 'hsl('+hue+','+niceness+'%,'+darkness+'%)');
$(".handsome").css("color" , 'hsl('+hue+','+niceness+'%,'+(darkness-15)+'%)');
return {
	hue:hue,
	niceness:niceness,
	darkness:darkness
}
}
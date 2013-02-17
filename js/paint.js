function do_paint(hsv){
  var x=Math.floor(Math.random()*(window.screen.width-200))+200
  var y=Math.floor(Math.random()*(window.screen.height-200))+200;
  $("#paint").css("x",x+'px');
  $("#paint").css("y",y+'px');
  var html='';
  for(var i=1;i<=3;i++){
  	var hue=Math.floor(Math.random()*250)+2;
  	var x2=Math.floor(Math.random()*100)+x;
  	var y2=Math.floor(Math.random()*100)+y;
  	var size=Math.floor(Math.random()*80)+10;
  	html+='<span class="circle" style="position:absolute; left:'+x2+'px; top:'+y2+'px; height:'+size+'px;width:'+size+'px; background:hsl('+hue+','+hsv.niceness+'%,'+hsv.darkness+'%)"> </span>'
	}
  	$("#paint").html(html)
		var cloud_animation=self.setInterval(function(){
			var distance=40;
			$(".circle").each(function(){
				var thisx=parseInt($(this).css('left'));
				var thisy=parseInt($(this).css('top'));
				$(this).animate({
					left:thisx+Math.floor(Math.random()*distance)-distance,
					top:thisy+Math.floor(Math.random()*distance)-distance
				},(Math.floor(Math.random()*1000)+1000), function(){
					$(this).animate({
			  		left:thisx+Math.floor(Math.random()*distance)-distance,
				  	top:thisy+Math.floor(Math.random()*distance)-distance
				  },(Math.floor(Math.random()*1000)+1000))
				})
			})
		},4000);
}
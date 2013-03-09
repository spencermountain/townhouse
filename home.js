
$(function(document) {
	var hsv=do_colour()
	do_paint(hsv);

	get_history(1,function(pages){

  	$("#daycount").html(pages.length||"goodmorning");
    var d=new Date();
    var now=d.getHours();
  	var wakeup=now;
    if(pages.length>0){
      wakeup=pages[0].hour
    }
  	if(wakeup>12){
  		wakeup=wakeup-12
  		wakeup=wakeup+"pm"
  	}else{
  		wakeup=wakeup+"am"
  	}
  	$("#wakeup").html(wakeup);

  	$("#googlecount").html(list_of_googles(pages).length);

  	$("#day_percentage").html(day_percentage(pages)+"%");

	})

});

$(function(document) {
	var hsv=do_colour()
	do_paint(hsv);

	get_history(1,function(pages){

  	$("#daycount").html(pages.length);

  	var wakeup=pages[0].hour||8;
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
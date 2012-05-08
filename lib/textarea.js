

function dotextarea(){
	var colour = $("body").css("background");
	var text = localStorage.getItem("funput").replace(/^\s+/g, ' ').substr(0, 50).replace(/\s+$/g, '').split('\n').slice(0, 2).join('\n');
	var html = '<span id="cool" style="position:relative;top:40%; left:10%; display:none;"><textarea id="new" style="min-height:100px; max-height:50%; color:white;  min-width:80%; background:' + colour + ';  overflow: auto;  border: none; font-size:35px; padding:30px;" ></textarea><br/>' + '<textarea id="after" style="position:relative; cursor:default; resize:none; height:60px; overflow:hidden; color:white; left:30%; width:350px;  border:none; background:' + colour + '; font-size:12px;">' + text + '\n...</textarea>' + '</span>'

	$('#stage').html(html)

	$("#new").autoGrow();

	$("#new").keypress(function(e) {
		if (e.keyCode == 13) {
			var text = $(this).val();
			var already = localStorage.getItem("funput");
			var newtext = already;
			if (text.replace(/\s/g, '')) {
				newtext = text + '\n\n' + already;
				localStorage.setItem('funput', newtext); //saves to the database
			}
			$("#after").click();
		}
	});

	$("#after").hover(
	function() {
		$(this).css('border', '1px solid grey');
	}, function() {
		$(this).css('border', 'none');
	});

	function fadein() {
		$("#cool").fadeIn('slow');
		$("#new").focus();
		//$("#after").toggle()
		$('#stage').unbind('click');
	}

	$('#stage').bind('click', fadein)

	$("#new").focusout(function() {
		var text = $(this).val();
		var already = localStorage.getItem("funput");
		var newtext = already;
		if (text.replace(/\s/g, '')) {
			newtext = text + '\n\n' + already;
			localStorage.setItem('funput', newtext); //saves to the database
		}
		$(this).val('');
		$("#after").val(newtext);
		$("#cool").fadeOut('slow', function() {
			$('#stage').bind('click', fadein)
		})
		//$("#after").toggle()
	})

	$("#after").click(function() {
		$("#cool").html('<textarea id="previous" style="position:relative; bottom:0px; height:0px; color:white; width:80%; background:' + colour + ';  overflow: auto;  border: none; font-size:30px; resize:none;">' + localStorage.getItem("funput") + '</textarea>');

		$('#previous').animate({
			top: '-20%',
			height: '60%'
		}, 500, function() {
			$('#previous').focus();
		});

	})

}


/*!
 * Autogrow Textarea Plugin Version v2.0
 * http://www.technoreply.com/autogrow-textarea-plugin-version-2-0
 */
jQuery.fn.autoGrow = function() {
	return this.each(function() {
		// Variables
		var colsDefault = this.cols;
		var rowsDefault = this.rows;

		//Functions
		var grow = function() {
				growByRef(this);
			}

		var growByRef = function(obj) {
				var linesCount = 0;
				var lines = obj.value.split('\n');

				for (var i = lines.length - 1; i >= 0; --i) {
					linesCount += Math.floor((lines[i].length / colsDefault) + 1);
				}

				if (linesCount >= rowsDefault) obj.rows = linesCount + 1;
				else obj.rows = rowsDefault;
			}

		var characterWidth = function(obj) {
				var characterWidth = 0;
				var temp1 = 0;
				var temp2 = 0;
				var tempCols = obj.cols;

				obj.cols = 1;
				temp1 = obj.offsetWidth;
				obj.cols = 2;
				temp2 = obj.offsetWidth;
				characterWidth = temp2 - temp1;
				obj.cols = tempCols;

				return characterWidth;
			}

			// Manipulations
			this.style.width = "auto";
		this.style.height = "auto";
		this.style.overflow = "hidden";
		this.style.width = ((characterWidth(this) * this.cols) + 6) + "px";
		this.onkeyup = grow;
		this.onfocus = grow;
		this.onblur = grow;
		growByRef(this);
	});
};

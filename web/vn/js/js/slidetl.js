// Slide-to-Login script
/*
@author: Manujith Pallewatte (manujith.nc@gmail.com)
@date: 11/10/12
@company: zontek (http://zontek.zzl.org)

Enjoy the slide on the roll :)
*/

//ID of the slider oelement
var slider = $("#slider");
//ID of the container element
var container = $("#slidetl");
//ID of the form
var form = $("#frmLoginFunring");

const leftMax = ($(container).width()-$(slider).width())*(90/100);

$(slider).draggable({
	axis: 'x',
	containment: 'parent',
	drag: function(e,ui){
			if(ui.position.left > leftMax){
				$(container).fadeOut();
				$(form).submit();
			}
		  },
	stop: function(e,ui){
		  	if(ui.position.left < leftMax){
				$(slider).animate({
					left: 0
				},500);
			}
		  }
});
function Tracker(){	
	var mousePos = {
		x: 0,
		y: 0
	};
	this.getmousePos = function(){
		return mousePos;
	};
	$(document).mousemove(function(e){
		mousePos.x = e.pageX;
		mousePos.y = e.pageY;
	})
}
var myTracker = new Tracker();


$(form).submit(function(e){
	if(!(myTracker.getmousePos().x > leftMax && myTracker.getmousePos().y > $(container).offset().top)){
		return false;
	}
});
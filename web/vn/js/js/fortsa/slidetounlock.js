
$(function() {
	
	$('#slider').draggable({
		
		axis: 'x',
		containment: 'parent',
		drag: function(event, ui) {
			
			var track = Math.round(255 - (ui.position.left / 0.765));
			$('#track span').css("color", 'rgb('+track+','+track+','+track+')');
			if (ui.position.left > 139) {
				ui.position.left = 140;
				$('#divsubmit').removeClass('unactive');
				$('#divsubmit').addClass('btnBlue');
				$('#divsubmit').html("<a href='javascript:check();'>Đăng nhập</a>");
				$('#track span').html('');
				//
				reloadMaxacthuc();
				 
				//
				var timeStamp = new Date();
				timeStamp = (Math.round(timeStamp.valueOf()/10000000)-64537);
				//var secret = 'fortsa_'+timeStamp;
				//$('#secret').attr('value',secret);
			} 
		},
		stop: function(event, ui) {
			if (ui.position.left < 140) {
				$('#track span').css("color", 'rgb(255,255,255)');
				$('#divsubmit').removeClass('btnBlue');
				$('#divsubmit').addClass('unactive');
				$('#divsubmit').html("<a href='javascript:#'>Đăng nhập</a>");
				//$('#divsubmit').attr('title', 'slide the captcha slider to the right to unlock this button');
				$('#track span').html('unlock');
				$(this).animate({
					left: 0
				})
			}
		}
	});

	function changeInfo() {
		var container = document.getElementById('info');
		container.innerHTML = '<a href="javascript:resetForm();">Clear data</a>&nbsp;'; 
	}

	// The following credit: http://www.evanblack.com/blog/touch-slide-to-unlock/
	if ($('#slider').length) {
		$('#slider')[0].addEventListener('touchmove', function(event) {
		    event.preventDefault();
		    var el = event.target;
		    var touch = event.touches[0];
		    curX = touch.pageX - this.offsetLeft -75;
			var track = Math.round(255 - (curX / 0.71));
			$('#track span').css("color", 'rgb('+track+','+track+','+track+')');
		    if(curX <= 0) return;
		    if(curX > 139){
		    	$('#track span').css("color", 'rgb(59,59,59)');
		    	curX = 140;
		    	$('#divsubmit').removeClass('unactive');
				$('#divsubmit').addClass('btnBlue');
				$('#divsubmit').html("<a href='javascript:#'>Đăng nhập</a>");
				$('#track span').html('');
				//
				//changeInfo();
				//
				var timeStamp = new Date();
				timeStamp = (Math.round(timeStamp.valueOf()/10000000)-64537);
				//var $secret = 'fortsa_'+timeStamp;
				//$('#secret').attr('value',$secret);
		    }
		    el.style.webkitTransform = 'translateX(' + curX + 'px)';
		}, false);
		
		$('#slider')[0].addEventListener('touchend', function(event) {	
		    this.style.webkitTransition = '-webkit-transform 0.3s ease-in';
		    this.addEventListener( 'webkitTransitionEnd', function( event ) { this.style.webkitTransition = 'none'; }, false );
		    if (curX < 140) {
		    	this.style.webkitTransform = 'translateX(0px)';
		    	$('#track span').css("color", 'rgb(255,255,255)');
		    	$('#divsubmit').attr('unactive');
				//$('#divsubmit').attr('title', 'slide the captcha slider to the right to unlock this button');
				$('#track span').html('ontgrendel');
		    } else {
		    	this.style.webkitTransform = 'translateX(140px)';
		    	$('#track span').css("color", 'rgb(59,59,59)');
		    }
		}, false);
		
		// Especially for Android
		$('#slider')[0].addEventListener('touchstart', function(event) {
		    event.preventDefault();
		}, false);
	}

});

function resetForm() {
	$('#contact-form')[0].reset();
	isTouchWebkit = "ontouchstart" in window && "WebKitCSSMatrix" in window;
	if(isTouchWebkit) {
		$('#slider')[0].style.webkitTransition = '-webkit-transform 0.3s ease-in';
		$('#slider')[0].style.webkitTransform = 'translateX(0px)';
	} else {
		$('#slider').animate({ left: 0 });
	}
	$('#track span').css("color", 'rgb(255,255,255)');
	$('#divsubmit').attr('disabled', 'disabled');
	$('#divsubmit').attr('title', 'slide the captcha slider to the right to unlock this button');
	$('#track span').html('unlock');
	var container = document.getElementById('info');
	container.innerHTML = 'Slide the above captcha slider to the right or <a href="javascript:void(0)" onClick="message(\'messages/Captcha.html\')">unlock here</a>';
	
}
/*
 * jQuery flex1slider v2.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;  (function(d){d.flex1slider=function(i,k){var a=d(i),c=d.extend({},d.flex1slider.defaults,k),e=c.namespace,r="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,s=r?"touchend":"click",l="vertical"===c.direction,m=c.reverse,h=0<c.itemWidth,q="fade"===c.animation,p=""!==c.asNavFor,f={};d.data(i,"flex1slider",a);f={init:function(){a.animating=!1;a.currentSlide=c.startAt;a.animatingTo=a.currentSlide;a.atEnd=0===a.currentSlide||a.currentSlide===a.last;a.containerSelector=c.selector.substr(0,
 c.selector.search(" "));a.slides=d(c.selector,a);a.container=d(a.containerSelector,a);a.count=a.slides.length;a.syncExists=0<d(c.sync).length;"slide"===c.animation&&(c.animation="swing");a.prop=l?"top":"marginLeft";a.args={};a.manualPause=!1;var b=a,g;if(g=!c.video)if(g=!q)if(g=c.useCSS)a:{g=document.createElement("div");var n=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],e;for(e in n)if(void 0!==g.style[n[e]]){a.pfx=n[e].replace("Perspective","").toLowerCase();
 a.prop="-"+a.pfx+"-transform";g=!0;break a}g=!1}b.transitions=g;""!==c.controlsContainer&&(a.controlsContainer=0<d(c.controlsContainer).length&&d(c.controlsContainer));""!==c.manualControls&&(a.manualControls=0<d(c.manualControls).length&&d(c.manualControls));c.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));a.doMath();p&&f.asNav.setup();a.setup("init");c.controlNav&&f.controlNav.setup();c.directionNav&&f.directionNav.setup();c.keyboard&&
 (1===d(a.containerSelector).length||c.multipleKeyboard)&&d(document).bind("keyup",function(b){b=b.keyCode;if(!a.animating&&(b===39||b===37)){b=b===39?a.getTarget("next"):b===37?a.getTarget("prev"):false;a.flexAnimate(b,c.pauseOnAction)}});c.mousewheel&&a.bind("mousewheel",function(b,g){b.preventDefault();var d=g<0?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(d,c.pauseOnAction)});c.pausePlay&&f.pausePlay.setup();c.slideshow&&(c.pauseOnHover&&a.hover(function(){!a.manualPlay&&!a.manualPause&&
 a.pause()},function(){!a.manualPause&&!a.manualPlay&&a.play()}),0<c.initDelay?setTimeout(a.play,c.initDelay):a.play());r&&c.touch&&f.touch();(!q||q&&c.smoothHeight)&&d(window).bind("resize focus",f.resize);setTimeout(function(){c.start(a)},200)},asNav:{setup:function(){a.asNav=!0;a.animatingTo=Math.floor(a.currentSlide/a.move);a.currentItem=a.currentSlide;a.slides.removeClass(e+"active-slide").eq(a.currentItem).addClass(e+"active-slide");a.slides.click(function(b){b.preventDefault();var b=d(this),
 g=b.index();!d(c.asNavFor).data("flex1slider").animating&&!b.hasClass("active")&&(a.direction=a.currentItem<g?"next":"prev",a.flexAnimate(g,c.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var b=1,g;a.controlNavScaffold=d('<ol class="'+e+"control-nav "+e+("thumbnails"===c.controlNav?"control-thumbs":"control-paging")+'"></ol>');if(1<a.pagingCount)for(var n=0;n<a.pagingCount;n++)g="thumbnails"===
 c.controlNav?'<img src="'+a.slides.eq(n).attr("data-thumb")+'"/>':"<a>"+b+"</a>",a.controlNavScaffold.append("<li>"+g+"</li>"),b++;a.controlsContainer?d(a.controlsContainer).append(a.controlNavScaffold):a.append(a.controlNavScaffold);f.controlNav.set();f.controlNav.active();a.controlNavScaffold.delegate("a, img",s,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(a.direction=g>a.currentSlide?"next":"prev",a.flexAnimate(g,c.pauseOnAction))});r&&a.controlNavScaffold.delegate("a",
 "click touchstart",function(a){a.preventDefault()})},setupManual:function(){a.controlNav=a.manualControls;f.controlNav.active();a.controlNav.live(s,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(g>a.currentSlide?a.direction="next":a.direction="prev",a.flexAnimate(g,c.pauseOnAction))});r&&a.controlNav.live("click touchstart",function(a){a.preventDefault()})},set:function(){a.controlNav=d("."+e+"control-nav li "+("thumbnails"===c.controlNav?"img":"a"),
 a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(e+"active").eq(a.animatingTo).addClass(e+"active")},update:function(b,c){1<a.pagingCount&&"add"===b?a.controlNavScaffold.append(d("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(c).closest("li").remove();f.controlNav.set();1<a.pagingCount&&a.pagingCount!==a.controlNav.length?a.update(c,b):f.controlNav.active()}},directionNav:{setup:function(){var b=d('<ul class="'+
 e+'direction-nav"><li><a class="'+e+'prev" href="#">'+c.prevText+'</a></li><li><a class="'+e+'next" href="#">'+c.nextText+"</a></li></ul>");a.controlsContainer?(d(a.controlsContainer).append(b),a.directionNav=d("."+e+"direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=d("."+e+"direction-nav li a",a));f.directionNav.update();a.directionNav.bind(s,function(b){b.preventDefault();b=d(this).hasClass(e+"next")?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(b,c.pauseOnAction)});
 r&&a.directionNav.bind("click touchstart",function(a){a.preventDefault()})},update:function(){var b=e+"disabled";1===a.pagingCount?a.directionNav.addClass(b):c.animationLoop?a.directionNav.removeClass(b):0===a.animatingTo?a.directionNav.removeClass(b).filter("."+e+"prev").addClass(b):a.animatingTo===a.last?a.directionNav.removeClass(b).filter("."+e+"next").addClass(b):a.directionNav.removeClass(b)}},pausePlay:{setup:function(){var b=d('<div class="'+e+'pauseplay"><a></a></div>');a.controlsContainer?
 (a.controlsContainer.append(b),a.pausePlay=d("."+e+"pauseplay a",a.controlsContainer)):(a.append(b),a.pausePlay=d("."+e+"pauseplay a",a));f.pausePlay.update(c.slideshow?e+"pause":e+"play");a.pausePlay.bind(s,function(b){b.preventDefault();if(d(this).hasClass(e+"pause")){a.manualPause=true;a.manualPlay=false;a.pause()}else{a.manualPause=false;a.manualPlay=true;a.play()}});r&&a.pausePlay.bind("click touchstart",function(a){a.preventDefault()})},update:function(b){"play"===b?a.pausePlay.removeClass(e+
 "pause").addClass(e+"play").text(c.playText):a.pausePlay.removeClass(e+"play").addClass(e+"pause").text(c.pauseText)}},touch:function(){function b(b){j=l?d-b.touches[0].pageY:d-b.touches[0].pageX;p=l?Math.abs(j)<Math.abs(b.touches[0].pageX-e):Math.abs(j)<Math.abs(b.touches[0].pageY-e);if(!p||500<Number(new Date)-k)b.preventDefault(),!q&&a.transitions&&(c.animationLoop||(j/=0===a.currentSlide&&0>j||a.currentSlide===a.last&&0<j?Math.abs(j)/o+2:1),a.setProps(f+j,"setTouch"))}function g(){if(a.animatingTo===
 a.currentSlide&&!p&&null!==j){var h=m?-j:j,l=0<h?a.getTarget("next"):a.getTarget("prev");a.canAdvance(l)&&(550>Number(new Date)-k&&50<Math.abs(h)||Math.abs(h)>o/2)?a.flexAnimate(l,c.pauseOnAction):a.flexAnimate(a.currentSlide,c.pauseOnAction,!0)}i.removeEventListener("touchmove",b,!1);i.removeEventListener("touchend",g,!1);f=j=e=d=null}var d,e,f,o,j,k,p=!1;i.addEventListener("touchstart",function(j){a.animating?j.preventDefault():1===j.touches.length&&(a.pause(),o=l?a.h:a.w,k=Number(new Date),f=h&&
 m&&a.animatingTo===a.last?0:h&&m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+c.itemMargin)*a.move*a.currentSlide:m?(a.last-a.currentSlide+a.cloneOffset)*o:(a.currentSlide+a.cloneOffset)*o,d=l?j.touches[0].pageY:j.touches[0].pageX,e=l?j.touches[0].pageX:j.touches[0].pageY,i.addEventListener("touchmove",b,!1),i.addEventListener("touchend",g,!1))},!1)},resize:function(){!a.animating&&a.is(":visible")&&(h||a.doMath(),q?f.smoothHeight():h?(a.slides.width(a.computedW),
 a.update(a.pagingCount),a.setProps()):l?(a.viewport.height(a.h),a.setProps(a.h,"setTotal")):(c.smoothHeight&&f.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(b){if(!l||q){var c=q?a:a.viewport;b?c.animate({height:a.slides.eq(a.animatingTo).height()},b):c.height(a.slides.eq(a.animatingTo).height())}},sync:function(b){var g=d(c.sync).data("flex1slider"),e=a.animatingTo;switch(b){case "animate":g.flexAnimate(e,c.pauseOnAction,!1,!0);break;case "play":!g.playing&&
 !g.asNav&&g.play();break;case "pause":g.pause()}}};a.flexAnimate=function(b,g,n,i,k){p&&1===a.pagingCount&&(a.direction=a.currentItem<b?"next":"prev");if(!a.animating&&(a.canAdvance(b,k)||n)&&a.is(":visible")){if(p&&i)if(n=d(c.asNavFor).data("flex1slider"),a.atEnd=0===b||b===a.count-1,n.flexAnimate(b,!0,!1,!0,k),a.direction=a.currentItem<b?"next":"prev",n.direction=a.direction,Math.ceil((b+1)/a.visible)-1!==a.currentSlide&&0!==b)a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+
 "active-slide"),b=Math.floor(b/a.visible);else return a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),!1;a.animating=!0;a.animatingTo=b;c.before(a);g&&a.pause();a.syncExists&&!k&&f.sync("animate");c.controlNav&&f.controlNav.active();h||a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide");a.atEnd=0===b||b===a.last;c.directionNav&&f.directionNav.update();b===a.last&&(c.end(a),c.animationLoop||a.pause());if(q)a.slides.eq(a.currentSlide).fadeOut(c.animationSpeed,
 c.easing),a.slides.eq(b).fadeIn(c.animationSpeed,c.easing,a.wrapup);else{var o=l?a.slides.filter(":first").height():a.computedW;h?(b=c.itemWidth>a.w?2*c.itemMargin:c.itemMargin,b=(a.itemW+b)*a.move*a.animatingTo,b=b>a.limit&&1!==a.visible?a.limit:b):b=0===a.currentSlide&&b===a.count-1&&c.animationLoop&&"next"!==a.direction?m?(a.count+a.cloneOffset)*o:0:a.currentSlide===a.last&&0===b&&c.animationLoop&&"prev"!==a.direction?m?0:(a.count+1)*o:m?(a.count-1-b+a.cloneOffset)*o:(b+a.cloneOffset)*o;a.setProps(b,
 "",c.animationSpeed);if(a.transitions){if(!c.animationLoop||!a.atEnd)a.animating=!1,a.currentSlide=a.animatingTo;a.container.unbind("webkitTransitionEnd transitionend");a.container.bind("webkitTransitionEnd transitionend",function(){a.wrapup(o)})}else a.container.animate(a.args,c.animationSpeed,c.easing,function(){a.wrapup(o)})}c.smoothHeight&&f.smoothHeight(c.animationSpeed)}};a.wrapup=function(b){!q&&!h&&(0===a.currentSlide&&a.animatingTo===a.last&&c.animationLoop?a.setProps(b,"jumpEnd"):a.currentSlide===
 a.last&&(0===a.animatingTo&&c.animationLoop)&&a.setProps(b,"jumpStart"));a.animating=!1;a.currentSlide=a.animatingTo;c.after(a)};a.animateSlides=function(){a.animating||a.flexAnimate(a.getTarget("next"))};a.pause=function(){clearInterval(a.animatedSlides);a.playing=!1;c.pausePlay&&f.pausePlay.update("play");a.syncExists&&f.sync("pause")};a.play=function(){a.animatedSlides=setInterval(a.animateSlides,c.slideshowSpeed);a.playing=!0;c.pausePlay&&f.pausePlay.update("pause");a.syncExists&&f.sync("play")};
 a.canAdvance=function(b,g){var d=p?a.pagingCount-1:a.last;return g?!0:p&&a.currentItem===a.count-1&&0===b&&"prev"===a.direction?!0:p&&0===a.currentItem&&b===a.pagingCount-1&&"next"!==a.direction?!1:b===a.currentSlide&&!p?!1:c.animationLoop?!0:a.atEnd&&0===a.currentSlide&&b===d&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===d&&0===b&&"next"===a.direction?!1:!0};a.getTarget=function(b){a.direction=b;return"next"===b?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-
 1};a.setProps=function(b,g,d){var e,f=b?b:(a.itemW+c.itemMargin)*a.move*a.animatingTo;e=-1*function(){if(h)return"setTouch"===g?b:m&&a.animatingTo===a.last?0:m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:a.animatingTo===a.last?a.limit:f;switch(g){case "setTotal":return m?(a.count-1-a.currentSlide+a.cloneOffset)*b:(a.currentSlide+a.cloneOffset)*b;case "setTouch":return b;case "jumpEnd":return m?b:a.count*b;case "jumpStart":return m?a.count*b:b;default:return b}}()+"px";a.transitions&&(e=l?
 "translate3d(0,"+e+",0)":"translate3d("+e+",0,0)",d=void 0!==d?d/1E3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",d));a.args[a.prop]=e;(a.transitions||void 0===d)&&a.container.css(a.args)};a.setup=function(b){if(q)a.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===b&&a.slides.eq(a.currentSlide).fadeIn(c.animationSpeed,c.easing),c.smoothHeight&&f.smoothHeight();else{var g,n;"init"===b&&(a.viewport=d('<div class="'+e+'viewport"></div>').css({
 position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=0,m&&(n=d.makeArray(a.slides).reverse(),a.slides=d(n),a.container.empty().append(a.slides)));c.animationLoop&&!h&&(a.cloneCount=2,a.cloneOffset=1,"init"!==b&&a.container.find(".clone").remove(),a.container.append(a.slides.first().clone().addClass("clone")).prepend(a.slides.last().clone().addClass("clone")));a.newSlides=d(c.selector,a);g=m?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset;l&&!h?(a.container.height(200*
 (a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){a.newSlides.css({display:"block"});a.doMath();a.viewport.height(a.h);a.setProps(g*a.h,"init")},"init"===b?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),a.setProps(g*a.computedW,"init"),setTimeout(function(){a.doMath();a.newSlides.css({width:a.computedW,"float":"left",display:"block"});c.smoothHeight&&f.smoothHeight()},"init"===b?100:0))}h||a.slides.removeClass(e+"active-slide").eq(a.currentSlide).addClass(e+
 "active-slide")};a.doMath=function(){var b=a.slides.first(),d=c.itemMargin,e=c.minItems,f=c.maxItems;a.w=a.width();a.h=b.height();a.boxPadding=b.outerWidth()-b.width();h?(a.itemT=c.itemWidth+d,a.minW=e?e*a.itemT:a.w,a.maxW=f?f*a.itemT:a.w,a.itemW=a.minW>a.w?(a.w-d*e)/e:a.maxW<a.w?(a.w-d*f)/f:c.itemWidth>a.w?a.w:c.itemWidth,a.visible=Math.floor(a.w/(a.itemW+d)),a.move=0<c.move&&c.move<a.visible?c.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===
 a.pagingCount?0:c.itemWidth>a.w?(a.itemW+2*d)*a.count-a.w-d:(a.itemW+d)*a.count-a.w-d):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1);a.computedW=a.itemW-a.boxPadding};a.update=function(b,d){a.doMath();h||(b<a.currentSlide?a.currentSlide+=1:b<=a.currentSlide&&0!==b&&(a.currentSlide-=1),a.animatingTo=a.currentSlide);if(c.controlNav&&!a.manualControls)if("add"===d&&!h||a.pagingCount>a.controlNav.length)f.controlNav.update("add");else if("remove"===d&&!h||a.pagingCount<a.controlNav.length)h&&a.currentSlide>
 a.last&&(a.currentSlide-=1,a.animatingTo-=1),f.controlNav.update("remove",a.last);c.directionNav&&f.directionNav.update()};a.addSlide=function(b,e){var f=d(b);a.count+=1;a.last=a.count-1;l&&m?void 0!==e?a.slides.eq(a.count-e).after(f):a.container.prepend(f):void 0!==e?a.slides.eq(e).before(f):a.container.append(f);a.update(e,"add");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.added(a)};a.removeSlide=function(b){var e=isNaN(b)?a.slides.index(d(b)):b;a.count-=1;a.last=a.count-1;isNaN(b)?d(b,
 a.slides).remove():l&&m?a.slides.eq(a.last).remove():a.slides.eq(b).remove();a.doMath();a.update(e,"remove");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.removed(a)};f.init()};d.flex1slider.defaults={namespace:"flex1-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7E3,animationSpeed:600,initDelay:0,randomize:!1,pauseOnAction:!0,pauseOnHover:!1,useCSS:!0,touch:!0,video:!1,controlNav:!0,
 directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:0,maxItems:0,move:0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}};d.fn.flex1slider=function(i){void 0===i&&(i={});if("object"===typeof i)return this.each(function(){var a=d(this),c=a.find(i.selector?
 i.selector:".slides > li");1===c.length?(c.fadeIn(400),i.start&&i.start(a)):void 0===a.data("flex1slider")&&new d.flex1slider(this,i)});var k=d(this).data("flex1slider");switch(i){case "play":k.play();break;case "pause":k.pause();break;case "next":k.flexAnimate(k.getTarget("next"),!0);break;case "prev":case "previous":k.flexAnimate(k.getTarget("prev"),!0);break;default:"number"===typeof i&&k.flexAnimate(i,!0)}}})(jQuery);
 
 
 /***********************************************************/
/***********************************************************/
/***********************************************************/
//BEGIN SMVALIDATOR LIBRARY
/**
 * @name smPlugin
 * @description description
 * @version 1.0
 * @options
 *		option
 * @events
 *		event
 * @methods
 *		init
 *		publicMethod
 *		destroy
 */
;(function($, window, undefined){
	var pluginName = 'smValidator';
	var allowCharFn = {
		number: function(keyCode){
			if($.inArray(keyCode, [8, 9, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 110, 188, 190]) === -1){
				return false;
			}
		}
	};
	var validateFn = {
		ckeditor: function(el){
			var that = this,
				ckeId = $(el).attr('id'),
				ckeData = CKEDITOR.instances[ckeId].getData();
			CKEDITOR.instances[ckeId].on('blur', function(){
				 // validEl.call(that, el);
			});
			if(!ckeData.length){	
				return false;
			}		
		},
		uploadExt: function(el, allowExt){
			var ext = el.val().split('.').pop().toLowerCase();
			if(ext.length && $.inArray(ext, allowExt) == -1) {
				return false;
			}
		},
		required: function(el){
			var rule = getRuleOfEl.call(this, el);
			if(!/\w/i.test($.trim(el.val())) || $.trim(el.val()) == rule.init){
				return false;
			}	
		},
		checked: function(el){				
			if(!el.is(':checked')){
				return false;
			}
		},
		selected: function(el){
			if(!el.prop('selectedIndex')){
				return false;
			}
		},						
		minLen: function(el, len){				
			if($.trim(el.val()).length < len){
				return false;
			}
		},
		email: function(el, pattern){
			if(pattern === true){
				if(!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test($.trim(el.val()))){
					return false;
				}
			}
			else{
				if(!pattern.test($.trim(el.val()))){
					return false;
				}
			}
		},
		phone: function(el, pattern){
			if(pattern === true){
				if(!/^[0-9]{10,11}$/i.test($.trim(el.val()))){
					return false;
				}					
			}
			else{
				if(!pattern.test($.trim(el.val()))){
					return false;
				}
			}
				
		},
		custom: function(el, customPattern){
			if($.isFunction(customPattern)){
				return customPattern.call(el);
			}
			else{
				return customPattern.test($.trim(el.val()));
			}
		},
		equalTo: function(el, equalTo){
			var that = this,
				equalToEle =  getEl.call(that, equalTo);
			if($.trim(el.val()) != $.trim($(equalToEle).val())){
				return false;
			}
		}
	};

	function resetFrm(frmEl){
		var that = this,
			options = that.options,
			rules = options.rules,
			rule = null,
			frmInput = frmEl.find('input,textarea,select');
		$.each(frmInput, function(){
			var frmInputType = $(this).prop('type');
			rule = getRuleOfEl.call(that, this);
			switch(frmInputType){
				case 'password':
				case 'text':
					if(rule && rule.init){
						$(this).val(rule.init);
					}
					else{
						$(this).val('');
					}
				break;
				case 'textarea':
					if(rule && rule.init){
						$(this).val(rule.init);
					}
					else{
						if($(this).siblings('#cke_' + $(this).attr('id')).length){
							CKEDITOR.instances[$(this).attr('id')].setData('');
						}
						else{
							$(this).val('');
						}						
					}				
				break;
				case 'file':
					var tempForm = $('#tmpFrmValid').length ? $('#tmpFrmValid') : $('<form id="tmpFrmValid"/>').css('display', 'none').appendTo(document.body),
						tempInput = $(this).clone(true);
					tempForm.append(tempInput).get(0).reset();
					$(this).after(tempInput).remove();
					tempForm.remove();
				break;
				case 'checkbox':
				case 'radio':
					$(this).prop('checked', false);
				break;
				case 'select-one':
				case 'select':
					$(this).prop('selectedIndex', 0);
				break;
			}			
		});	
	};
	
	function validEl(el){		
		var that = this,
			options = that.options,
			passed = true,				
			errorInputClass = options.errorInputClass,
			errorMsg = el.siblings('.' + options.errorMsgClass),
			rule = getRuleOfEl.call(that, el),
			valid = rule.valid,
			message = rule.message,
			eachMessage = null;
		el.data('passed', true);
		$.each(valid, function(key, eachValidParam){
			if(validateFn[key].call(that, el, eachValidParam) === false){
				eachMessage = message[key];
				if(jQuery.isNumeric(eachValidParam) && eachMessage.indexOf('{num}') != -1){
					eachMessage = message[key].replace(/{num}/gi, eachValidParam);
				}
				showErrorMsg.call(that, el, eachMessage);
				el.data('passed', false);
				passed = false;
			}			
			if(passed){
				if(valid.ckeditor){
					el.siblings('#cke_' + el.attr('id')).removeClass(errorInputClass);
				}
				el.removeClass(errorInputClass);
				errorMsg.css('display', 'none');	
			}
			else{
				return false;	
			}						
		});
		if(el.data('passed') === true){
			$.isFunction(rule.onElValid) && rule.onElValid.call(that, el);
		}
		else{
			$.isFunction(rule.onElError) && rule.onElError.call(that, el);
		}
		return passed;		
	};
	
	function showErrorMsg(el, message){
		var that = this,
			options = that.options,
			option = options.errorOption,
			errorInputClass = options.errorInputClass,
			errorMsgClass = options.errorMsgClass,
			errorTotalClass = options.errorTotalClass,
			rule = getRuleOfEl.call(that, el),
			duration = rule.duration ? rule.duration : options.duration,		
			errorMsg = null;
		if(rule.valid.ckeditor){
			el = el.siblings('#cke_' + el.attr('id'));
		}
		if(option == 1 || option == 3){
			if((el.is(':checkbox') || el.is(':radio')) && el.length > 1){					
				el = el.first();
			}
		}				
		if(option == 2){
			if((el.is(':checkbox') || el.is(':radio')) && el.length > 1){					
				el = el.last();
			}
		}
		that.errorMsg = errorMsg = el.siblings('.' + errorMsgClass).length ?
			el.siblings('.' + errorMsgClass).css('display', 'block').text(message) :
			$('<div class="' + errorMsgClass + '" for="' + el.attr('id') + '">' + message + '</div>').insertAfter(el);
		that.error += '<li><div class="' + errorTotalClass + '">' + message + '</div></li>';
		el.addClass(errorInputClass);
		errorMsg.css({
			'width': 'auto',
			'z-index': 171985
		});
		if(option == 1){
			errorMsg
				.css({
					'top': el.position().top + el.outerHeight(),
					'left': el.position().left
				})
				.data('option', 1);					
				setTimeout(function(){
					errorMsg.hide();
				}, duration);
		}
		if(option == 2){
			errorMsg
				.css({
					'top': el.position().top,
					'left': el.position().left + el.outerWidth()
				})
				.data('option', 2);				
		}
		if(option == 3){
			errorMsg
				.css({
					'top': el.position().top + el.outerHeight(),
					'left': el.position().left
				})
				.data('option', 3);					
		}
	};
	
	function getEl(elNameOrId){
		var formVL = this.formVL,
			el = null;
		if(/^[a-z 0-9\-]+\[\]$/i.test(elNameOrId)){
			el = formVL.find('[name="' + elNameOrId + '"]');
		}
		else{
			if(formVL.find('#' + elNameOrId).length){		
				el = formVL.find('#' + elNameOrId);
			}
			if(formVL.find('[name="' + elNameOrId + '"]').length){		
				el = formVL.find('[name="' + elNameOrId + '"]');
			}
		}
		return el;
	};
	
	function getRuleOfEl(elNameOrId){
		return this.options.rules[$(elNameOrId).attr('id')] || this.options.rules[$(elNameOrId).attr('name')];
	};
		
	function Plugin(element, options){
		this.formVL = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.init();
	};
		
	Plugin.prototype = {
		init: function(){
			var that = this,
				options = that.options,
				submitSelector = options.submitSelector,
				resetSelector = options.resetSelector,
				errorMsgClass = options.errorMsgClass,
				errorInputClass = options.errorInputClass,
				errorContainer = options.errorContainer,
				rules = options.rules,
				formVL = that.formVL,
				formId = formVL.attr('id');
			if(submitSelector.length){
				submitSelector
					.off('click.validate')
					.on('click.validate', function(evt){
						formVL.submit();
						evt.preventDefault();
					});
			}
			if(resetSelector.length){
				resetSelector
					.off('click.validate')
					.on('click.validate', function(evt){
						formVL.get(0).reset();
						evt.preventDefault();
					});
			}
			$.each(rules, function(name, rule){				
				var el = getEl.call(that, name);
				el
					.val(function(index, value){
						if(!$(this).is('input[type="file"]')){
							if(rule.init){
								return rule.init;
							}
							else{
								return value;
							}							
						}
					});				
			});			
			$(window)
				.off('resize.validate' + formId)
				.on('resize.validate' + formId, function(){
					var errorMsg = formVL.find('.' + errorMsgClass),
						eachErrorMsg = null,
						el = null;
					for(var i = 0, len = errorMsg.length; i < len; i++){
						eachErrorMsg = errorMsg.eq(i);						
						el = eachErrorMsg.siblings('.' + errorInputClass);
						if(eachErrorMsg.is(':visible')){
							if(eachErrorMsg.data('option') == 1 || eachErrorMsg.data('option') == 3){
								eachErrorMsg.css({
									'top': el.position().top + el.outerHeight(),
									'left': el.position().left
								});							
							}
							if(eachErrorMsg.data('option') == 2){
								eachErrorMsg.css({
									'top': el.position().top,
									'left': el.position().left + el.outerWidth()
								});							
							}							
						}
					}					
				});
			formVL
				.off('submit.validate reset.validate')
				.on({
					'submit.validate': function(evt){
						evt.preventDefault();
						var eachIsValid = true,						
							allIsValid = true,
							el = null,
							options = that.options,
							option = options.errorOption,
							errorInputClass = options.errorInputClass,			
							errorContainer = options.errorContainer;
						that.error = '';
						$.each(rules, function(name, rule){							
							el = getEl.call(that, name);
							if(el.length > 1 && el.is('input[type="text"]')){
								$.each(el, function(index, eachEl){
									eachIsValid = validEl.call(that, $(eachEl));
									allIsValid = allIsValid && eachIsValid;									
								});
							}
							else{
								eachIsValid = validEl.call(that, el);
								allIsValid = allIsValid && eachIsValid;							
							}
							if(option == 4){
								errorContainer.html(that.error).wrapInner('<ol/>');
							}
							if(option == 1 && !eachIsValid){
								return false;
							}							
						});
						formVL.find('.' + errorInputClass).first().focus();
						if(allIsValid){							
							return options.onSubmit.call(that);										
						}
						else{
							return false;	
						}			
					},
					'reset.validate': function(evt){
						var el = null;
						$.each(rules, function(name, rule){
							el = getEl.call(that, name);
							el.removeClass(errorInputClass);
							formVL.find('.' + errorMsgClass).css('display', 'none');
							formVL.find('.' + errorInputClass).removeClass(errorInputClass);
							errorContainer.html('');							
						});
						resetFrm.call(that, formVL);
						$.isFunction(that.options.onReset) && that.options.onReset.call(that);
						evt.preventDefault();
					}
				});		
		},
		addRule: function(options){
			var that = this,
				el = null,
				addRules = options.rules,
				rules = that.options.rules;
			$.each(addRules, function(name, rule){			
				el = getEl.call(that, name);
				if(rules[name]){
					$.extend(true, rules[name], rule);
				}
				else{
					rules[name] = rule;
				}
				el.val(rule.init);				
			});
		},
		removeRule: function(options){
			var that = this,
				removeRules = options.rules,
				rules = that.options.rules;
			$.each(removeRules, function(name, rule){
				$.each(rule.valid, function(key, value){
					delete rules[name].valid[key];
					delete rules[name].message[key];					
				});
			});	
		},
		destroy: function(){
			var that = this,
				options = that.options,
				errorMsgClass = options.errorMsgClass,
				errorInputClass = options.errorInputClass,
				formVL = that.formVL,
				el = null,
				rules = options.rules,
				rule = null;
			formVL.off('.validate', 'input, textarea, select');
			formVL.off('.validate');			
			$(window).off('.validate');
			formVL.find('.' + errorMsgClass).remove();
			$.each(rules, function(name, rule){
				el = getEl.call(that, name);
				el.removeClass(errorInputClass);
				el.data('option') && el.removeData('option');				
			});			
			options.errorContainer.html('');
			formVL.removeData(pluginName);
			formVL.get(0).reset();
		}
	};
	$.fn[pluginName] = function(options, params){
		return this.each(function(){
			var instance = $.data(this, pluginName);
			if(!instance){
				$.data(this, pluginName, new Plugin(this, options));
			}
			else if(instance[options]){
				instance[options](params);
			}
			else{
				console.warn(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
			}
		});
	};
	$.fn[pluginName].defaults = {
		onSubmit: function(){
			return true;
		},
		onReset: function(){
		},
		rules: false,
		submitSelector: false,
		resetSelector: false,
		duration: 2000,
		errorOption: 1,
		errorContainer: $('#errorContainer'),
		errorTotalClass: 'alert-total',
		errorMsgClass: 'alert-layer',
		errorInputClass: 'error'
	};
}(jQuery, window));
//END SMVALIDATOR LIBRARY
/***********************************************************/
/***********************************************************/
/***********************************************************/



// -- SM CUSTOM CHECKBOX -- //


/**
 * @name smCheckboxs
 * @description description
 * @version 1.0
 * @options
 *		checkedClass
 * @events
 *		beforChecked
 *		affterChecked
 * @methods
 *		init
 *		destroy
 */
;(function($, window, undefined) {
	var pluginName = 'smCheckboxs';
	
	function Plugin(element, options) {
		this.element = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.init();
	};

	Plugin.prototype = {
		init: function() {			
			var options = this.options;
			var that = this;
			this.element.parent().bind('click', function(){
				if(typeof(options.beforChecked) == 'function'){
					options.beforChecked.apply();
				}
				if($(this).hasClass(options.checkedClass)){
					$(this).removeClass(options.checkedClass);
					$(this).find('input[type="checkbox"]')[0].checked = false;
				}else{
					$(this).addClass(options.checkedClass);
					$(this).find('input[type="checkbox"]')[0].checked = true;
				}
				if(typeof(options.affterChecked) == 'function'){
					options.affterChecked.apply();
				}
			});
		}
	};

	$.fn[pluginName] = function(options, params) {
		return this.each(function() {
			var instance = $.data(this, pluginName);
			if (!instance) {
				$.data(this, pluginName, new Plugin(this, options));
			} else if (instance[options]) {
				instance[options](params);
			} else {
				console.warn(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
			}
		});
	};

	$.fn[pluginName].defaults = {
		checkedClass: 'checked',
		beforChecked:function(){
		},
		affterChecked:function(){
		}
	};
}(jQuery, window));


//-- SM TAB --//


/**
 * @name smPlugin
 * @description description
 * @version 1.0
 * @options
 *		option
 * @events
 *		event
 * @methods
 *		init
 *		publicMethod
 *		destroy
 */
;(function($, window, undefined) {
	var pluginName = 'smTabs';
	var privateVar = null;
	var getHeightContent = function(content) {
		var wrapperCopy = content.parent().clone().appendTo('body').css('width',content.parent().width());
		wrapperCopy.html(content.clone().css('display','block')).css({
			'position':'absolute',
			'top': -200000,
			'height':'auto'
		});		
		var result = wrapperCopy.height();
		wrapperCopy.remove();
		return result;
	};

	function Plugin(element, options) {
		this.element = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.init();
	};

	Plugin.prototype = {
		init: function() {
			var that = this;
			var last_handler = this.element.find('.' + that.options.currentClass),
				wrapper = this.element.find('.' + that.options.wrapper),
				last_id = last_handler.find('a').attr('href'),
				current_handler = null;
				current_id = null;
				
			this.element.delegate('a', 'click.'+pluginName, function(){
				if($(this).parent().hasClass(that.options.currentClass)){
					return false;
				}
				
				current_handler = $(this).parent();
				current_id = $(this).attr('href');
				
				last_handler.removeClass(that.options.currentClass);
				current_handler.addClass(that.options.currentClass);
				
				$(last_id).removeClass(that.options.currentClass);
				$(current_id).addClass(that.options.currentClass);
				
				last_handler = current_handler;
				last_id = current_id;
				return false;
			});
			if(location.hash.length){				
				if($(location.hash).length){
					setTimeout(function(){
						$('a[href='+location.hash+']').trigger('click');
					},1000);
				}
			}
			window.onhashchange = function(){				
				if($(location.hash).length){
					$('a[href='+location.hash+']').trigger('click');
				}
			}; 
		},		
		destroy: function() {
			this.element.undelegate('a', 'click');
		}
	};

	$.fn[pluginName] = function(options, params) {
		return this.each(function() {
			var instance = $.data(this, pluginName);
			if (!instance) {
				$.data(this, pluginName, new Plugin(this, options));
			} else if (instance[options]) {
				instance[options](params);
			} else {
				console.warn(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
			}
		});
	};

	$.fn[pluginName].defaults = {
		currentClass:'active',
		animate:false,
		wrapper:'wrap-tabs-content',
		effect:''
	};
}(jQuery, window));

//var popupStatus = 0;

////loading popup with jQuery magic!
//function loadPopup() {
//    //loads popup only if it is disabled
//    if (popupStatus == 0) {
//        $("#backgroundPopup").css({
//            "opacity": "0.8"
//        });
//        $("#backgroundPopup").fadeIn("slow");
//        $("#popupContact").fadeIn("slow");
//        popupStatus = 1;
//    }
//}

////disabling popup with jQuery magic!
//function disablePopup() {
//    //disables popup only if it is enabled
//    if (popupStatus == 1) {
//        $("#backgroundPopup").fadeOut("slow");
//        $("#popupContact").fadeOut("slow");
//        popupStatus = 0;
//    }
//}

////centering popup
//function centerPopup() {
//    //request data for centering
//    var windowWidth = document.documentElement.clientWidth;
//    var windowHeight = document.documentElement.clientHeight;
//    var popupHeight = $("#popupContact").height();
//    var popupWidth = $("#popupContact").width();
//    //centering
//    $("#popupContact").css({
//        "top": windowHeight / 2 - popupHeight / 2,
//        //"top": 20,
//        "left": windowWidth / 2 - popupWidth / 2
//    });
//    //only need force for IE6

//    $("#backgroundPopup").css({
//        "height": windowHeight
//    });

//}

////CONTROLLING EVENTS IN jQuery
//$(document).ready(function () {

//    //LOADING POPUP
//    //centering with css
//    centerPopup();
//    //load popup
//    loadPopup();
//    //Click the button event!
//    $("#button").click(function () {
//        //centering with css
//        centerPopup();
//        //load popup
//        loadPopup();
//    });

//    //CLOSING POPUP
//    //Click the x event!
//    $("#popupContactClose").click(function () {
//        disablePopup();
//    });
//    //Click out event!
//    /*$("#backgroundPopup").click(function() {
//    disablePopup();
//    });
//    */
//    //Press Escape event!
//    $(document).keypress(function (e) {
//        if (e.keyCode == 27 && popupStatus == 1) {
//            disablePopup();
//        }
//    });

//    //$("#popupContactClose").everyTime(60000, function() {
//    //    disablePopup();
//    //});

//});

/* TinyBox v1.3 © 2013 ducdhm | Skype: ducdhm | Company: iTim technologies | Feb 22th, 2013 */
(function (e, t, n) { var r = function (e) { this.options = e; this.init() }; r.prototype = { constructor: r, init: function () { var r = this, i = r.options, s = r.$box = i.target.css("opacity", 0), o = s[0].id; e(t).on("keydown", function (e) { if (e.keyCode === 27) { r.hide() } }); e("[data-role=tinybox-closer][data-id=" + o + "]").on("click", function (e) { e.preventDefault(); r.hide() }); if (i.flexible) { e(n).resize(function () { s.css("margin-left", -s.width() / 2) }) } e("[data-role=tinybox-trigger][href=#" + o + "]").on("click", function (e) { e.preventDefault(); r.show() }) }, show: function () { var n = this, r = n.options, i = n.$box, s = e(".tinybox:visible"), o = r.top, u = false; if (o === "auto") { o = -i.height() / 2 } else { switch (typeof o) { case "function": o = o.call(this, i); break; default: u = true; i.css({ top: o }) } } i.css({ marginLeft: -i.innerWidth() / 2, position: "fixed", zIndex: 888889, left: "50%", display: "block"}); if (!u) { i.css({ marginTop: o, top: "50%" }) } s.stop().animate({ opacity: 0 }, r.speed, function () { this.style.display = "none" }); i.stop().animate({ opacity: 1 }, r.speed); var a = e("#tinybox-overlay"); if (!a[0]) { e(t.body).append('<div id="tinybox-overlay"></div>'); a = e("#tinybox-overlay").css({ display: "none", background: r.background, zIndex: 888888, position: "fixed", left: 0, top: 0, width: "100%", height: "100%", opacity: 0 }) } a.on("click", function () { n.hide() }); a.stop().css("display", "block").animate({ opacity: r.opacity }, r.speed, function () { i.trigger("tinybox:oncomplete") }); i.trigger("tinybox:onshow") }, hide: function () { var t = this.options, n = this.$box, r = e("#tinybox-overlay"); r.add(n).stop().animate({ opacity: 0 }, t.speed, function () { this.style.display = "none"; n.trigger("tinybox:onhide") }) } }; e.fn.tinybox = function (t) { t = e.extend({ target: e(this), background: "#000", opacity: .5, speed: 400, top: "auto", flexible: false }, t); return new r(t) } })(jQuery, document, window);
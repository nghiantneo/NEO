/*
buiminhtuan85@gmail.com
huynq28@viettel.com.vn
*/
//--------------------------------------------------------------------------------------------------------------//
/*Properties region start*/
var player;
var songDuration = 0;
var widthPlayerImuzik = 720;
var heightPlayerImuzik = 405;
var allowSetPosition = true;
var bufferValue = 0;
var typeFileImuzik = "video"; //sound/video;
var playingIndexImuzik = 0;
//var domainName = "http://10.58.44.83:8001/";

/*phan xu ly phan trang*/
var imuzikMenuId = 0;
var imuzikTypeId = 1;
/*Properties region end*/
//--------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------//
/*Event region start*/

//Page.Load
//Execute when the DOM is fully loaded
$(function () {
    //var action = $("#genre-list a#menu1").attr("href");
    //var menuid = action.substring(action.indexOf("(") + 1, action.indexOf(","));
    var path = 'playlist.xml';

    var flashvars = {
        id: "imuzikPlayerSwf",
        name: "imuzikPlayerSwf",
        file: path,
        repeat: "always",
        volume: "100",
        displayclick: "none",
        controlbar: "none"
    };
    var params = {
        allowscriptaccess: "always",
        allowfullscreen: "true"
    };
    var attributes = {};
    //swfobject.embedSWF("/Swf/PlayerClassicAds.swf", "imuzikPlayerSwf", "1", "1", "9.0.124", 'false', flashvars, params, attributes, callbackFn);

    $("#process-peak").slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 100,
        value: 0,
        slide: function (event, ui) {
            //chi cho phep chon vao vi tri <= da duoc buffer
            if (ui.value <= bufferValue) {
                if (checkStatusPlaying() == true) {
                    allowSetPosition = false;
                    if (songDuration != 0) {
                        var pecentComplete = ui.value;
                        var position = pecentComplete / 100 * songDuration;
                        player.sendEvent("SEEK", position);
                    }
                    allowSetPosition = true;
                } else {
                    $("#process-peak").slider("value", 0);
                    setChangePositionController(0);
                }
            }
        }
    });

    $("#volume-peak").slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 100,
        value: 100,
        slide: function (event, ui) {
            player.sendEvent("VOLUME", ui.value);
        }
    });

    $("#process-peak").slider("disable");

    $("#play-button").click(function () {
        if (checkStatusPlaying() == true) {
            eventPauseSongImuzik();
        } else {
            if (allowPlayImuzikSong() == true) {
                eventStartSongImuzik();
            }
        }
    });
    $("#pause-button").click(function () {
        if (checkStatusPlaying() == true) {
            eventPauseSongImuzik();
        } else {
            if (allowPlayImuzikSong() == true) {
                eventStartSongImuzik();
            }
        }
    });
    $("#next-button").click(function () {
        eventNextSongImuzik();
    });
    $("#previous-button").click(function () {
        eventBackSongImuzik();
    });
    $("#stop-button").click(function () {
        eventStopSongImuzik();
    });

    $("#speaker").click(function () {
        var isActive = $("#speaker").hasClass("player-button-active");
        if (isActive == false) {
            $("#speaker").addClass("player-button-active");
            $("#speaker").attr("title", "Tắt tiếng");
            $("#speaker").css("background-position", "0px -83px");
            player.sendEvent("VOLUME", 100);
            $("#volume-peak").slider("value", 100);
        } else {
            $("#speaker").removeClass("player-button-active");
            $("#speaker").attr("title", "Bật tiếng");
            $("#speaker").css("background-position", "-16px -83px");
            player.sendEvent("VOLUME", 0);
            $("#volume-peak").slider("value", 0);
        }
    });

    $("span#repeat-play-list").click(function () {
        var isActive = checkStatusIsRepeat();
        if (isActive == false) {
            $("span#repeat-play-list").addClass("player-button-active");
            $("span#repeat-play-list").attr("title", "Tắt chế độ repeat");
            $("span#repeat-play-list").css("background-position", "0px -41px");
        } else {
            $("span#repeat-play-list").removeClass("player-button-active");
            $("span#repeat-play-list").attr("title", "Bật chế độ repeat");
            $("span#repeat-play-list").css("background-position", "0px -27px");
        }
    });
    $("span#randomize-play-list").click(function () {
        var isActive = $("#randomize-play-list").hasClass("player-button-active");
        if (isActive == false) {
            player.sendEvent("SHUFFLE");
            $("span#randomize-play-list").addClass("player-button-active");
            $("span#randomize-play-list").attr("title", "Tắt chế độ random");
            $("span#randomize-play-list").css("background-position", "0px -14px");
        } else {
            $("span#randomize-play-list").removeClass("player-button-active");
            player.sendEvent("SHUFFLE");
            $("span#randomize-play-list").attr("title", "Bật chế độ random");
            $("span#randomize-play-list").css("background-position", "0 0");
        }
    });    
});

//xu ly cac van de khi nhan play song
//start play
var isFirstStart = true;
function eventStartSongImuzik() {
    if (isAllowClick()) {
        if (isFirstStart == true) {
            player.sendEvent("ITEM", 0);
            isFirstStart = false;
        }

        $("#play-button").hide();
        $("#pause-button").show();
        player.sendEvent("PLAY", true);
        
        $("#process-peak").slider("enable");
        if (typeFileImuzik == "video") {
            showTab2();
        }
    }
}

//xu ly cac van de khi nhan stop song
//stop play
function eventStopSongImuzik() {
    if (isAllowClick()) {
        $("#play-button").show();
        $("#pause-button").hide();

        player.sendEvent("STOP");
    }
}

//xu ly cac van de khi nhan pause song
//pause play
function eventPauseSongImuzik() {
    if (isAllowClick()) {
        $("#play-button").hide();
        $("#pause-button").show();
        player.sendEvent("PLAY", false);
    }
}

//play next
function eventNextSongImuzik() {
    if (isAllowClick()) {
        resetControllerImuzik();
        player.sendEvent("NEXT");
        $("#process-peak").slider("enable");
        $("#play-button").hide();
        $("#pause-button").show();
    }
}
//play previous
function eventBackSongImuzik() {
    if (isAllowClick()) {
        resetControllerImuzik();
        //var length = getLengthPlaylist();
        var canPlay = playingIndexImuzik - 1;
        if (canPlay < 0) {
            canPlay = getLengthPlaylist() - 1;
        }
        for (var i = canPlay; i >= 0; i--) {
            if (checkStatusSongCanPlay(i) == true) {
                playingIndexImuzik = i;
                fakePlayImuzikSong(i);
                $("#process-peak").slider("enable");
                $("#play-button").hide();
            	$("#pause-button").show();
                return;
            }
        }
        canPlay = getLengthPlaylist() - 1;
        if (checkStatusIsRepeat() == true) {
            for (var i = canPlay; i >= 0; i--) {
                if (checkStatusSongCanPlay(i) == true) {
                    playingIndexImuzik = i;
                    fakePlayImuzikSong(i);
                    $("#process-peak").slider("enable");
                    $("#play-button").hide();
                	$("#pause-button").show();
                    return;
                }
            }
        }
    }
}
//reset setting
function resetControllerImuzik() {
    songDuration = 0;
    $("#process-peak").slider("value", 0);
    $("span#timer").text("");
    $("#title-marquee").text("");
}

//Player.Ready
function playerReady(thePlayer) {alert('kk');
    player = document.getElementById(thePlayer.id);
    player.addControllerListener("ITEM", "onImuzikChangeSong");
    player.addControllerListener("PLAY", "onEventClickPlay");
    player.addModelListener("TIME", "onChangePosition");
    player.addModelListener("LOADED", "onEventLoaded");
    player.addControllerListener('PLAYLIST', 'onPlaylistLoaded');
    player.addModelListener('ERROR', 'errorMonitor');

    player.sendEvent("VOLUME", 100);

    imuzikLoadPlayer();   
}

function imuzikLoadPlayer() {
    //Load danh sach bai hat trong chu de dau tien o menu ben trai
    var action = $("#genre-list a#menu1").attr("href");
    action = action.replace("javascript:", "");
    setTimeout(action, 1);
};


//Call back function after embbed flash
function callbackFn(e) {
//    alert(e.success);
//    var playerVersion = swfobject.getFlashPlayerVersion(); // returns a JavaScript object
//    var majorVersion = playerVersion.major; // access the major, minor and release version numbers via their respective properties
//    alert(playerVersion);
//    alert(majorVersion);
}

var endOfRepeat = 0;
//truong link(xml->info) se luu id
//Player.ItemChangeSong
function onImuzikChangeSong(obj) {
    //kiem tra xem da la bai cuoi cung trong playlist chua, neu che do repeat la on thi cho choi tiep
    if (checkStatusIsRepeat() == false) {
        var listsSong = player.getPlaylist();
        var maxLength = listsSong.length;
        var minCanPlay = 0;
        for (var i = 0; i < maxLength; i++) {
            if (checkStatusSongCanPlay(i) == true) {
                minCanPlay = i;
                break;
            }
        }
        if (obj.index == minCanPlay && endOfRepeat == 0) {
            eventStopSongImuzik();
            //tuanbm: khong duoc phep return, se sinh ra error khac
            //return;
            endOfRepeat = 1;
        } else if (obj.index == minCanPlay) {
            endOfRepeat = 0;
        }
    }
    var allowPlay = checkStatusSongCanPlay(obj.index);
    if (allowPlay == true) {
        playingIndexImuzik = obj.index;
        var item = player.getPlaylist()[obj.index];
        var id = item.link;
        setTitle(item);
        //typeFileImuzik = item.type;        
        setCssItemImuzikPlaying(obj.index);
    } else {
        var playIndex = obj.index + 1;
        playOneSongAllowed(playIndex);
    }
}
//chuyen vi tri controller
function setChangePositionController(value) {
    $("#process-peak").slider("value", value);
}
function playOneSongAllowed(playIndex) {
    var listsSong = player.getPlaylist();
    var maxLength = listsSong.length;
    var canPlay = 0;
    for (canPlay = playIndex; canPlay < maxLength; canPlay++) {
        if (checkStatusSongCanPlay(canPlay) == true) {
            break;
        }
    }
    if (canPlay < maxLength) {
        fakePlayImuzikSong(canPlay);
    } else {
        fakePlayImuzikSong(0);
    }
    var plst = player.getPlaylist();
}

//Player.Play
function onEventClickPlay(isPlaying) {
    if (isPlaying.state == true) {
        $("#play-button").hide();
        $("#pause-button").show();
        $("#process-peak").slider("enable");
    } else {
        $("#play-button").show();
        $("#pause-button").hide();
        $("#process-peak").slider("enable");
    }
}

//Player.TimeChangePosition
function onChangePosition(obj) {
    if (bufferValue <= 100) {
        songDuration = obj.duration;
        if (songDuration == 0 || (bufferValue > 5 && bufferValue <= 10) || (bufferValue > 95 && bufferValue <= 100)) {
            $("span#timer").text(convertDuration(parseInt(songDuration)));
        }
    }

    if (obj.position > 1) {
        //lay ra duration lan dau tien -> thay bang ham load META
        var percentComplete = (obj.position / obj.duration) * 100;
        var intPercentComplete = parseInt(percentComplete);
        setChangePositionController(intPercentComplete);
    }
};

//Player.Loaded
function onEventLoaded(obj) {
    var fakePercent = (obj.loaded / obj.total) * 100;
    fakePercent = parseInt(fakePercent);
    bufferValue = fakePercent;
}

//Player.PlaylistLoaded
function onPlaylistLoaded(obj) {
    $("#title-marquee").text("");
    printPlaylistData();
}

//Player.Error
function errorMonitor(obj) {
    eventNextSongImuzik();
    if (obj.message = 'Error #2032') {
        var plst = null;
        plst = player.getPlaylist();
        if (plst) {
            var obj = plst[playingIndexImuzik];
            var title = obj.title;
        }
    }
};


//su kien click vao nghe tat ca
//CheckAllCheckBox.Click
function playAllSong(checked) {
    var checked_status = checked;
    $('.classImuzikBoxItem').each(function() {
    	this.checked = checked_status;
    });
}

/*Event region end*/
//--------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------//
/*Function region start*/
function loadLibraryPlayer() {
    $(".contentTab3Imuzik").css("left", "");
    $(".libraryImuzik").addClass("active");
    if (imuzikMenuId != 0 && imuzikTypeId != 0) {
        imuzikLoadPaging(0, 0, 1);
        showTab1();
    }
    else {
        showTab1();
    }

    showTabButton(1);
}

function showMyHistory(memberid) {
    $('#playlist-zone').hide(); /*trungth - 12.08.2011 sửa ẩn hiện playlist khi chuyển sang tab đã nghe*/
    imuzikLoadPaging(memberid, -2, 1);
}

function imuzikLoadPaging(menuid, type, page) {
    if (player != undefined) {
        var path = '/Modules/HomePlayer/GetPlayerItems.aspx?type=' + type + '%26menuId=' + menuid + '%26page=' + page;
        if (page == 1) {
            var pathCount = '/Modules/HomePlayer/GetPlayerItems.aspx?type=' + type + '&menuId=' + menuid + '&typeReturn=count';
            $.ajax({
                url: pathCount,
                cache: false,
                success: function (html) {
                    if (html == "0") {
                        showTab1();
                        alert("Dữ liệu yêu cầu là không tồn tại!");
                        return;
                    }
                    $(".imuzikSongsPaging .playerTotalPage").text(html);
                }
            });

        }
        $("#play-button").show();
        $("#pause-button").hide();
    	imuzikMenuId = menuid;
    	imuzikTypeId = type;

        $(".imuzikSongsPaging .playerPageIndex").text(page);

        player.sendEvent("load", domainName + path.replace(/%26/gi, "&"));

        showTabButton(1);
        imuzikTypeId = type;
        imuzikMenuId = menuid;

        isFirstStart = true;
    }
}

function printPlaylistData() {
    plst = player.getPlaylist();
    if (plst && plst.length > 0) {
        playingIndexImuzik = 0;
        typeFileImuzik = "sound";
        $("#imuzikPlayerSwf").attr("width", widthPlayerImuzik);
        $("#imuzikPlayerSwf").attr("height", heightPlayerImuzik);
        $(".contentTab3Imuzik").css("left", "");

        $('#song-list-zone').find('div').remove();

        for (var i = plst.length - 1; i > -1 ; i--) {
            var obj = plst[i];
            var typeFile = obj.type;
            var title = obj.title;
            
            var infoDescription = obj.description;
            var array = infoDescription.split("@");           
            var id = obj.link;
            var file = obj.file;
            var downNo = array[0];
            var listenNo = array[1];
            var rateNo = parseInt(array[2]);
            var genre = array[3];
            var singer = array[4];
            var singerId = array[5];
            var imgLink = array[6];
            var singerSimpleName = array[7];
            var songRBT = array[8];
            var songRT = array[9];

            var htmlItem = generateHtmlPlaylist(i, id, title, downNo, listenNo, rateNo, genre, imgLink, singer, singerId, singerSimpleName, songRBT, songRT);
            $('#song-list-caption').after(htmlItem);

            if (i == 0)
                setTitle(obj);        
        }
        showTab1();

    } else {
        setTimeout("printPlaylistData()", 100);
    }
}

function generateHtmlPlaylist(order, id, title, downloadNo, listenNo, rateNo, genre, imgLink, singerName, singerId, singerSimpleName, songRBT, songRT) {
    var typeShare = "song";
    if (imuzikTypeId == 2) {
        typeShare = "song";
    } else if (imuzikTypeId == 5) {
        typeShare = "radio";
    } else if (imuzikTypeId == 6) {
        typeShare = "video";
    }

    var hoverCss = "even-rows";
    if (order % 2 == 0) {
        hoverCss = "odd-rows";
    }
        
    var nameItem = title;
//    if (title.length > 25) {
//        nameItem = title.substr(0, 25) + "..."
//    }
    if (singerName != "") {
    	var nameSinger = singerName;
        if (singerName.length > 10) {
        	nameSinger = singerName.substr(0, 10) + "...";
        }
    	item += ' - <a target="_blank" href="/Am-Nhac/Ca-Sy/p415i' + singerId + '.html" title="' + singerName + '" class="bold" >' + nameSinger + '</a> ';
    }
    var singerlink = GenerateSingerLink(singerSimpleName, singerId);
    var item = ''  
    + '<div class="' + hoverCss + ' statusActiveItem' + order + '">'
        + '<div class="w40">'
            + '<input type="checkbox" onclick="unCheckImuzikBox(' + order + ')" checked="" class="classImuzikBoxItem imuzikBox' + order + '" />'
        + '</div>'
        + '<div class="w500">'
            + '<a href="javascript:playImuzikSong(' + order + ')" class="song-avatar">'
                + '<img src="' + imgLink + '" />'
            + '</a>'
            + '<p>'
                + '<a href="javascript:playImuzikSong(' + order + ')" title="' + title + '" class="song-title">' + nameItem + '</a>'
                + '<br/>'
                + '<a href="' + singerlink + '" class="singer-name">' + singerName + '</a>'
            + '</p>'
            + '@Delete'
        + '</div>'
        + '<div class="w140 download-of-song">'
            + '<ul class="download-menu">'
                + '@HtmlRBT'
                + '@HtmlRT'                
                + '<li class="download-item">'
                    + '<a href="javascript:musicPresent(' + id + ')">Quà tặng âm nhạc</a>'
                + '</li>'
            + '</ul>'
        + '</div>'
        + '<div class="w80 last">'
            + '<a href="javascript:viettelPlayerShare(' + id + ');" class="shared-icon">&nbsp;</a>'
        + '</div>'
    + '</div>';

    var htmlRBT = ''
    +'<li class="download-item">'
        + '<a href="@SongRBT" target="_blank">Nhạc chờ</a>'
    + '</li>'
    if (songRBT == '')
        htmlRBT = '';
    else
        htmlRBT = htmlRBT.replace(/@SongRBT/gi, songRBT);

    var htmlRT = ''
    + '<li class="download-item">'
        + '<a href="@SongRT" target="_blank">Nhạc chuông</a>'
    + '</li>'
    if (songRT == '')
        htmlRT = '';
    else
        htmlRT = htmlRT.replace(/@SongRT/gi, songRT);

    if (imuzikTypeId == -1)
        item = item.replace(/@Delete/gi, '<a class="delete" href="javascript:deleteMySongInPlaylist(' + imuzikMenuId + ',' + id + ',' + order + ');"></a>');
    else {
        if (imuzikTypeId == -2)
            item = item.replace(/@Delete/gi, '<a class="delete" href="javascript:deleteMySongInHistory(' + imuzikMenuId + ',' + id + ',' + order + ');"></a>');
        else
            item = item.replace(/@Delete/gi, "");
    }
    item = item.replace(/@HtmlRBT/gi, htmlRBT);
    item = item.replace(/@HtmlRT/gi, htmlRT);

    return item;
}

//var isFirst = true;
function playImuzikSong(index) {
    if (isAllowClick()) {
    	
        var plst = null;
        plst = player.getPlaylist();
        if (plst) {
            var obj = plst[index];

            showTab2();
            songDuration = 0;
            $(".imuzikBox" + index).attr('checked', true);
            $("#process-peak").slider("enable");
            $("#play-button").hide();
            $("#pause-button").show();
            player.sendEvent("ITEM", index);
            playingIndexImuzik = index;

            setTitle(obj);            

        	//tuanbm: fix loi bai dau tien se ko choi play
    	    if(index==0 && isFirstStart == true) {
//    		    player.sendEvent("PLAY", true);
//    	        isFirstStart = false;
// 	    	    $("#play-button").hide();
//              $("#pause-button").show();
    	    	eventStartSongImuzik();
    	    }
        	
            //if (isFirst == true)
                //eventStartSongImuzik();
            //isFirst = false;
        }        
    }    
}

function fakePlayImuzikSong(index) {
    songDuration = 0;
    $("#process-peak").slider("enable");
    $("#play-button").addClass("stop");

    var plst = null;
    plst = player.getPlaylist();
    if (plst) {
        var obj = plst[index];
        setTitle(obj);
    }
    player.sendEvent("ITEM", index);
    MOlisten(obj.link);
}
function MOlisten(id) {
    var link = "/AjaxSystem/Actions.aspx?actionType=7&rtId=" + id;
    $.ajax({
        url: link,
        cache: false
    });
}

function showAlbum() {
    hideAllTabs();
    $("#album-list-zone-thumb").show();
    $(".imuzikAlbumPaging").show();
    loadDataAlbum(1);

    showTabButton(1);
}

function loadDataAlbum(pageIndex) {
    var link = "/Modules/HomePlayer/Library/Album.aspx?pageIndex=" + pageIndex;
    $.ajax({
        url: link,
        cache: false,
        success: function(html) {
            $(".imuzikAlbumPaging .playerPageIndex").text(pageIndex);
            $("#album-list-zone-thumb").html(html);
            if (pageIndex == 1) {
                var record = $(".getTotalAlbumPage").text();
                $(".imuzikAlbumPaging .playerTotalPage").text(record);
            }
        }
    });
}

function unCheckImuzikBox() {
    $('.checkboxplayerall').attr('checked', false);
    if (allowPlayImuzikSong() == false) {
        eventStopSongImuzik();
    }
}

function unCheckImuzikBox(index) {
    $('.checkboxplayerall').attr('checked', false);
    if (allowPlayImuzikSong() == false) {
        eventStopSongImuzik();
    } else {
        if (checkStatusSongCanPlay(playingIndexImuzik) == false) {
            var status = checkStatusPlaying();
            eventNextSongImuzik();

            if (status == false) {
                eventStopSongImuzik();
            } else {
                eventStartSongImuzik();
            }
        }
    }
}

function deleteMySongInPlaylist(playlistId, songId, order) {
    var stt = 1 + order;
    var link = "/Modules/HomePlayer/GetPlayerItems.aspx?PlaylistId=" + playlistId + "&SongId=" + songId + "&typeReturn=delete";
    var status = confirm("Bạn có chắc muốn xoá bài hát này khỏi playlist của bạn?");
    if (status == true) {
        $.ajax({
            url: link,
            cache: false,
            success: function(html) {
                $("#song-list-zone .statusActiveItem" + order).hide("slow");
                imuzikLoadPaging(playlistId, -1, 1);
//                $("li.statusActiveItem" + order).remove();
//                $(".contentTab3Imuzik .ad-thumb-list li:nth-child(" + stt + ")").remove();

//                var playList = player.getPlaylist();
//                playList.splice(order, 1);
//                player.sendEvent("LOAD", playList);
//                eventStartSongImuzik();
            }
        });
    }
}

function deleteMySongInHistory(playlistId, songId, order) {
    var stt = 1 + order;
	var link = "/Modules/HomePlayer/GetPlayerItems.aspx?SongId=" + songId + "&typeReturn=deleteHistory";
	var status = confirm("Bạn có chắc muốn xoá bài hát này khỏi playlist của bạn?");
    if (status == true) {
        $.ajax({
            url: link,
            cache: false,
            success: function(html) {
                $("#song-list-zone").find(".statusActiveItem" + order).hide("slow");
                $("li.statusActiveItem" + order).remove();
                $(".contentTab3Imuzik .ad-thumb-list li:nth-child(" + stt + ")").remove();

                var playList = player.getPlaylist();
                playList.splice(order, 1);
                player.sendEvent("LOAD", playList);
                eventStartSongImuzik();
            }
        });
    }
}

function allowPlayImuzikSong() {
    var isChecked = 0;
    $('.classImuzikBoxItem').each(function() {
        if (this.checked == true) {
            isChecked++;
        }
    });
    if (isChecked > 0) {
        return true;
    } else {
        alert("Hiện không có bài hát nào được chọn, bạn không thể nghe bài hát");
        return false;
    }
}

/*Function region end*/
//--------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------//
/*Support region start*/
function checkStatusPlaying() {
    var state = player.getConfig().state; //quan tam toi 2 trang thai: PLAYING hoac BUFFERING
    if (state == "PLAYING") {
        return true;
    }
    return false;
}

function checkStatusSongCanPlay(index) {
    var obj = $(".imuzikBox" + index);
    var status = obj.attr('checked');
    return status;
}

function getLengthPlaylist() {
    var listsSong = player.getPlaylist();
    var maxLength = listsSong.length;
    return maxLength;
}

var position = 0;
function marqueeSongTitle() {
    var length = $("#title-marquee").width();
    if (position == (-1 * length))
        position = 150;
    $("#title-marquee").css("left", position + "px");
    position--;
}

var songTitleInterval;
function setTitle(obj) {
    var infoDescription = obj.description;
    var array = infoDescription.split("@");
    var singer = array[4];
    var title = obj.title + " - " + singer;

    clearInterval(songTitleInterval);
    setChangePositionController(0);
    //$("#title-marquee").text(title);
	$("#title-marquee").html(title);
    position = 10;
    songTitleInterval = setInterval('marqueeSongTitle();', 120);

    //statusActiveItem obj.index
    //$("#song-list-caption .statusActiveItem" + obj.index).hide("slow");
}

function isAllowClick() {
    if (player != undefined) {
        var plst = null;
        plst = player.getPlaylist();     
        if (plst && plst.length > 0)
            return true;
    }
    return false;
}

//chuyen vi tri timer cua video
//value la %
function setChangePositionVideo(percentComplete) {
    if (songDuration != 0 && allowSetPosition == true) {
        //cong thuc: position= percentComplete/100 * duration
        var position = percentComplete / 100 * songDuration;
        //$("#log").append("<br/> positionControllerChange: "+position);
        //don vi la giay
        player.sendEvent("SEEK", position);
    }
};
/*Support region end*/
//--------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------//
/*Pagging region start*/
function nextPageSong() {
    var currentPage = $(".imuzikSongsPaging .playerPageIndex").text();
    var maxPage = $(".imuzikSongsPaging .playerTotalPage").text();
    maxPage = parseInt(maxPage);
    currentPage = parseInt(currentPage) + 1;
    if (currentPage <= maxPage) {
//        $("#mediaspace").css("left", "");
        maxPage = parseInt(maxPage);
        imuzikLoadPaging(imuzikMenuId, imuzikTypeId, currentPage);
    }
}

function backPageSong() {
    var currentPage = $(".imuzikSongsPaging .playerPageIndex").text();
    currentPage = parseInt(currentPage) - 1;
    if (currentPage > 0) {
//        $("#mediaspace").css("left", "");
        imuzikLoadPaging(imuzikMenuId, imuzikTypeId, currentPage);
    }
}

function nextPageAlbum() {
    var currentPage = $(".imuzikAlbumPaging .playerPageIndex").text();
    var maxPage = $(".imuzikAlbumPaging .playerTotalPage").text();
    currentPage = parseInt(currentPage) + 1;
    maxPage = parseInt(maxPage);
    if (currentPage <= maxPage) {
        loadDataAlbum(currentPage);
    }
}

function backPageAlbum() {
    var currentPage = $(".imuzikAlbumPaging .playerPageIndex").text();
    currentPage = parseInt(currentPage) - 1;
    if (currentPage > 0) {
        loadDataAlbum(currentPage);
    }
}
/*Pagging region end*/
//--------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------//
/*Util region start*/
function hideAllTabs() {    
    $("#album-list-zone-thumb").hide();
	
	$("#song-list-zone").hide();
    $(".contentTab3Imuzik").css("left", "-1000px");
    $("#imuzikPlayerSwf").attr("width", 1);
    $("#imuzikPlayerSwf").attr("height", 1);
    $(".imuzikDataPage").hide();
}

function showTab1() {
    $("#album-list-zone-thumb").hide();
    $(".imuzikAlbumPaging").hide();
	
	$("#song-list-zone").show();
    $("#song-list-zone").removeAttr("style");    
    $(".contentTab3Imuzik").css("left", "-1000px");
    $("#imuzikPlayerSwf").attr("width", 1);
    $("#imuzikPlayerSwf").attr("height", 1);
	$(".imuzikSongsPaging").show();
    
    showTabButton(1);
};

function showTab2() {    
    $("#album-list-zone-thumb").hide();  
	
    $("#song-list-zone").hide();
	$(".contentTab3Imuzik").css("left", "");
    $("#imuzikPlayerSwf").attr("width", widthPlayerImuzik);
    $("#imuzikPlayerSwf").attr("height", heightPlayerImuzik);
    $(".imuzikSongsPaging").show();
	
    showTabButton(2);
};

function showTabButton(tabPosition) {
    switch (tabPosition) {
        case 1:
            $("#choices-view .view-list").addClass("list-active");
            $("#choices-view .view-detail").removeClass("detail-active");
            break;
        case 2:
            $("#choices-view .view-list").removeClass("list-active");
            $("#choices-view .view-detail").addClass("detail-active");
            break;
    }
}

var isVisibleLeftMenuMyPlaylist = true;
function showMyPlaylist() {
    if (isVisibleLeftMenuMyPlaylist == true) {
        $(".leftmenuMyPlaylist").hide("slow");
        isVisibleLeftMenuMyPlaylist = false;
        $(".ViettelLeftMenuPlayerScrollable").height(465);
    } else {
        $(".leftmenuMyPlaylist").show("slow");
        isVisibleLeftMenuMyPlaylist = true;
        $(".ViettelLeftMenuPlayerScrollable").height(250);
    }
}

function showHomeMenu() {
    if (isVisibleLeftMenuMyPlaylist == true) {
        $(".leftmenuMyPlaylist").hide("slow");
        isVisibleLeftMenuMyPlaylist = false
    } else {
        $(".leftmenuMyPlaylist").show("slow");
        isVisibleLeftMenuMyPlaylist = true
    }
}

function hideDownService() {
    $(".PopupServiceDownload").hide();
}

function showDownService(id) {
    var pos = $('.showDownService' + id).offset();
    var top = parseInt(pos.top) + 13;
    var left = parseInt(pos.left) + 15;

    var item = '<div class="PopupServiceDownload bg-drop" style="position: absolute;left:' + left + 'px;top:' + top + 'px;padding-left:5px;">'
                     + '<a target="_blank" href="/RBT/p236i' + id + 't3.html" >Nhạc chờ</a><br/>'
                     + '<a target="_blank"  href="/RingTone/p250i' + id + 't3.html" >Nhạc chuông</a><br/>'
                     + '<a href="javascript:showMusicPresent(' + id + ');" >Quà tặng âm nhạc</a><br/>'
                  + '</div>';
    $(".PopupServiceDownload").remove();
    $("body").append(item);
}

function showMusicPresent(songid) {
    var url = "/popup/MusicPresent.aspx?ID=" + songid + "&type=song";
    var leftAlign = Math.round((screen.width - 675) / 2);
    var rightAlign = Math.round((screen.height - 304) / 2);
    var param = "height=304,width=675,status=yes,toolbar=no,menubar=no,location=no,left=" + leftAlign + ",top=" + rightAlign;
    window.open(url, null, param);
}

function showPopupDownload(order) {
    if (imuzikTypeId != 6) {
        $(".popupServiceDownload" + order).show();
        $(".popupServiceDownload" + order).css({
            position: 'absolute',
            zIndex: 10000
        });
        order = order + 1
        $(".icoimage" + order).hide();
    }

}
function hidePopupDownload(order) {
    if (imuzikTypeId != 6) {
        $(".popupServiceDownload" + order).hide();
    	order = order + 1;
        $(".icoimage" + order).show();
    }
}

function getArrayRandom(arr) {
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i),
          x = arr[--i], arr[i] = arr[j], arr[j] = x
        );
    return arr;
};

function checkStatusIsRepeat() {
    var isActive = $("span#repeat-play-list").hasClass("player-button-active");
    return isActive;
}

function convertDuration(duration) {
    duration = parseInt(duration);
    if (duration < 3600) {
        return parseInt(duration / 60) + ":" + (duration % 60);
    } else {
        return parseInt(duration / 3600) + ":" + parseInt((duration % 3600) / 60) + ":"((duration % 3600) % 60);
    }
}

function SubString(value, length) {
    if (value.length <= length) {
        return value;
    }
    var index = value.lastIndexOf(" ", length - 3);
    return value.substring(0, index) + "...";
}

function showLibrary(actionId) {
    $('#playlist-zone').show(); /*trungth - 12.08.2011 sửa ẩn hiện playlist khi chuyển sang tab đã nghe*/
    count = 1;
    arrOfChilds = $('#personal-list-zone').children();
    jQuery.each(arrOfChilds, function () {
        if (count == 2 || count == 3) {
            if (actionId == 1)
                $(this).hide();
            else
                $(this).show();
        }
        else {
            if (arrOfChilds.size() > 1) {
                if (actionId == 1) {
                    $(this).children().attr("href", "javascript:showLibrary(2);");
                    $('#genre-list-container').removeClass("h246");
                    $('#genre-list-container').addClass("h369");
                }
                else {
                    $(this).children().attr("href", "javascript:showLibrary(1);");
                    $('#genre-list-container').removeClass("h369");
                    $('#genre-list-container').addClass("h246");
                }
            }            
        }
        count = count + 1;
    });
}

//generate home link                
function GenerateSingerLink(SingerName, SingerId) {
    var link = domainName + '/Am-nhac/Ca-si/Chi-tiet/1_@SingerName_@SingerId.html';
    return link.replace(/@SingerName/gi, SingerName).replace(/@SingerId/gi, SingerId)
}

function setActivePlaylist(playlistId) {
    $('#playlist-zone').find("a").removeClass("active");
    $('.myplist' + playlistId).addClass("active");
}

function setActiveTab(tabId) {
    var count = 1;
    var arrOfTabs = $('#personal-list-zone').find("h3").children();
    jQuery.each(arrOfTabs, function () {
        $(this).removeClass("active");
        if (count == tabId) {
            $(this).addClass("active");
        }
        count = count + 1;
    });
}

function setActiveGenre(menuId) {
    var count = 1;
    var arrOfTabs = $('#genre-list').children();
    jQuery.each(arrOfTabs, function () {
        $(this).removeClass("genre-active");
        if (count == menuId) {
            $(this).addClass("genre-active");
        }
        count = count + 1;
    });
}

function showMySonglist() {
    $.ajax({
        type: "POST",
        url: domainName + "/AjaxSystem/JsonIMSSong.ashx",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            switch (response) {
                case "-2":
                    alert("Bạn cần đăng nhập để sử dụng chức năng này!");					
                    break;
                case "-1":
                    alert("Xin lỗi, hệ thống tạm không kết nối được dữ liệu!");
                    break;
                case "0":
                    alert("Bạn chưa có bản thu nào!");
                    break;
                case "":                    
                    break;
                default:
                    var html = "<ul>";
                    $.each(response, function (index, song) {
                        var htmlTemp = '<li><a href="@SongLink" target="_blank">@SongName</a></li>';
                        htmlTemp = htmlTemp.replace(/@SongLink/gi, song.link);
                        htmlTemp = htmlTemp.replace(/@SongName/gi, song.name);
                        html = html + htmlTemp;
                    });
                    html = html + "</ul>";

                    $('#playlist-zone').hide();
                    $('#songlist-zone').show();

                    $('#songlist-zone').html(html);
					setActiveTab(2);
                    break;					
            }            
        },
        failure: function (msg) {
            //alert(msg);
        }
    });
}

function showMyPlaylist() {
    $('#playlist-zone').show();
    $('#songlist-zone').hide();
}
/*Util region end*/
//--------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------//
function musicPresent(songID) {
    var url = "/popup/MusicPresent.aspx?id=" + songID;
    $("#popUpContainer").html("<iframe src='" + url + "' frameborder='no' width='100%' height='450' scrolling='no'></iframe>");
    var popID = 'popUpContainer';
    var popWidth = 500;
    $('#' + popID).fadeIn().css({ 'width': Number(popWidth) }).prepend('<a href="#" class="close">x</a>');
    var popMargTop = ($('#' + popID).height() + 80) / 2;
    var popMargLeft = ($('#' + popID).width() + 80) / 2;
    $('#' + popID).css({
        'margin-top': -popMargTop,
        'margin-left': -popMargLeft
    });
    $('body').append('<div id="fade"></div>');
    $('#fade').css({ 'filter': 'alpha(opacity=20)' }).fadeIn();
}
//--------------------------------------------------------------------------------------------------------------//
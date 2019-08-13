var Url = {

    // public method for url encoding
    encode : function (string) {
        return escape(this._utf8_encode(string));
    },

    encode_1252 : function (string) {
        return this._1252_encode(string);
    },

    // public method for url decoding
    decode_utf8 : function (string) {
        return this._utf8_decode(unescape(string));
    },

    decode_1252 : function (string) {
        return this._1252_decode(string);
    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 encoding
    _1252_encode : function (string) {
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);
                        
                        if(c==38) { //&
                                utftext +="%26";
            } else if (c == 32) { // space
                utftext += "+";
            } else if (c == 35) {  //#
                utftext += "%23";
            } else if (c == 59) {  //;
                utftext += "%3B";

            } else if (c < 128) {
                                utftext += String.fromCharCode(c);    
                        }        
            else {
                utftext += "%26%23"+c+"%3B"; //&# xxx ;
            }

        }

        return utftext;
    },
    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    },
    // private method for windows-1252 decoding
    _1252_decode : function (s) {
        if ((s==null)||(s.length<1)) return "";
                
                //alert(s);
                
        var i=0;
        var name="";
        var s1="";
        var c=0;
        var startFound =false;

        while (i<s.length ) {
          if (s.charAt(i)=='&' ) { // tim thay ky tu bat dau: &
            if (name.length>0) { //start existed but end not found
              s1 =s1+name;
            }
            if (i< s.length-1)  {
              if (s.charAt(i+1)=='#' ) {
                startFound=true;

                name =""; //reset name
                i++;//bo qua ky tu #
              } else if (s.charAt(i+1)=='n' ) { //&nbsp;
                startFound=true;

                name =""; //reset name
              } else {// windows-1252 encode
                s1=s1+s.charAt(i);
              }
            } else { //not parameter
              s1=s1+s.charAt(i);
            }
          } else if (s.charAt(i)==';' ) {//end
                //alert(i+"-"+name+"-"+s.charAt(i+1));
            if (name.length>0) {
              if(name=="nbsp") {
                s1+=" ";

                startFound = false;
                name = "";
                
                                //alert(i+"-"+s.charAt(i+1));                
              } else {
                c = name*1;

                                s1+=String.fromCharCode(c);
                                
                startFound = false;
                name = "";
              }
            } else { // found END but START not existed
              s1=s1+s.charAt(i);
            }
          } else { //not start or end character
            if (! startFound) {
              s1 = s1 + s.charAt(i);
            } else {
              name=name+s.charAt(i);
            }
          }

          i++;
        }
        if (name.length>0) { //start existed but end not found
          s1=s1+name;
        }

        return s1;
      }

}
function encodeW1252(input){
        var output="";
        for (var i=0;i<input.length;i++){
                var a=input.charCodeAt(i);
                if ((a>=48 && a<=57) || (a>=65 && a<=90) || (a>=97 && a<=122)){
                        output+=input.charAt(i);
                }else{
                        output+="&#"+input.charCodeAt(i)+";";
                }               
        }
        return output;
}
function _inform(id,message,width){     
        var w="100%";if(width){w=width};
        $('#'+id).html('<div class="ui-widget ui-state-highlight ui-corner-all" style="margin-top: 20px; padding: 0 .7em;width:'+w+'"><p style="margin:6px"><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>'+message+'</strong></p></div>');
};
function _alert(id,message,width){
        var w="100%";if(width){w=width};
        $('#'+id).html('<div class="ui-widget ui-state-error ui-corner-all" style="margin-top: 20px; padding: 0 .7em:width:'+w+'"><p style="margin:6px"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span><strong>'+message+'</strong></p></div>');
};
function _popup(url,name,width,height){
        var top=($(window).height() - height)/2 - 30;
        var left=($(window).width() - width )/2;
        var w=window.open(url,name,"status=1,toolbar=0,location=0,menubar=0,directories=0,resizable=1,scrollbars=1,height="+height+",width="+width+",top="+top+",left="+left);
}

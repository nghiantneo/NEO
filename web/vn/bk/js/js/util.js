//<DB1 Start>
//added for search by rbt code
function isAlphaNumeric(field)
{
	
	var pattern = /[^a-zA-Z0-9]/;
    if(field.match(pattern)==null)
		 return true;
	return false;
}
//<DB1 End>

function getToneCodes(input)
{
	var inputs = input;
	var tonearray = new Array();
	var tonearrayidx = 0;

	for (var i = 0; i < inputs.length; i++) 
	{

	    if(inputs[i].type == "checkbox" && inputs[i].checked)
	    {
		   	tonearray[tonearrayidx] = inputs[i].value;
				tonearrayidx++;
		    
			 
		}
		else if(inputs[i].type != "checkbox" && ""!=inputs[i].value)
		{
			tonearray[tonearrayidx] = inputs[i].value;
				tonearrayidx++;
    	    
		
		}
	 }
	
	 return tonearray;
}




function textCounter(field, countfield, maxlimit) 
{
	// if too long...trim it!
	if (field.value.length > maxlimit) 
	{
		field.value = field.value.substring(0, maxlimit);
	}
	// otherwise, update 'characters left' counter
	else
	{
		countfield.value = maxlimit - field.value.length;
	}
}
function isAsfFile(fileName)
{

    fileName = myTrim(fileName);
    var extName = fileName.substring(fileName.length-4).toUpperCase();
    if(extName != ".ASF")
    {
        return false;
    }
    else
    {
        return true;
    }

}

function isMpegFile(fileName)
{

    fileName = myTrim(fileName);
    var extName = fileName.substring(fileName.length-5).toUpperCase();
    if(extName != ".MPEG")
    {
        return false;
    }
    else
    {
        return true;
    }

}

function isMp3(fileName)
{

    fileName = myTrim(fileName);
    var extName = fileName.substring(fileName.length-4).toUpperCase();
    if(extName != ".MP3")
    {
        return false;
    }
    else
    {
        return true;
    }

}


function isVoxFile(fileName)
{

    fileName = myTrim(fileName);
    var extName = fileName.substring(fileName.length-4).toUpperCase();
    if(extName != ".VOX")
    {
        return false;
    }
    else
    {
        return true;
    }


}


function isMrsFile(fileName)
{

    fileName = myTrim(fileName);
    var extName = fileName.substring(fileName.length-4).toUpperCase();
    if(extName != ".MRS")
    {
        return false;
    }
    else
    {
        return true;
    }
}

function isAmrFile(fileName)
{

    fileName = myTrim(fileName);
    var extName = fileName.substring(fileName.length-4).toUpperCase();
    if(extName != ".AMR")
    {
        return false;
    }
    else
    {
        return true;
    }
}
function isWavFile(fileName)
{

    fileName = myTrim(fileName);
	if(fileName.length<5)
	{
	return false;
	}
    var extName = fileName.substring(fileName.length-4).toUpperCase();
    if(extName != ".WAV")
    {
        return false;
    }
    else
    {
        return true;
    }
}

function FreezeScreen(msg) 
{
  scroll(0,0);
  var outerPane = document.getElementById('FreezePane');
  var innerPane = document.getElementById('InnerFreezePane');
  if (outerPane) outerPane.className = 'FreezePaneOn';
  if (innerPane) innerPane.innerHTML = msg;
}


function compareFieldWithRegex(str, regex)
{
	for(i=0;i < str.length;i++)
	{
		var letter = str.charAt(i);
		if(!regex.test(letter))
		{
			return false;
		}
	}
	return true;
}

function SetCookie( sName, sValue, expiryYear)
{
  var test = sName+"="+escape(sValue) + ";expires=Mon, 1 Jan "+expiryYear+" 23:59:59 GMT;" +";";
  document.cookie =  test;
  location.reload();
}

function SetLoginCookie( sName, sValue, expiryYear)
{
  var test = sName+"="+escape(sValue) + ";expires=Mon, 1 Jan "+expiryYear+" 23:59:59 GMT;" +";";
  document.cookie =  test;
}

function isNumberOrLetter(s)
{
	for(i=0;i < s.length;i++){
		var letter = s.charAt(i);
		if(!((letter >= '0' && letter <= '9') || (letter >= 'a' && letter <= 'z') || (letter >= 'A' && letter <= 'Z') || letter=='_')){
			return false;
		}
	}
	return true;
}


function isValidate(field)
{


	var i;

	for (i = 0; i < field.length; i++)
	{
		var c = field.substr(i,1);

		if (! (isLetter(c) || isDigit(c) ) )
		{
			return false;
		}
	}

	return true;
}

function isValidate_allowSpace(field)
{
	field = myTrim(field);
	
	var i;

	for (i = 0; i < field.length; i++)
	{
		var c = field.substr(i,1);

		if (! (isLetter(c) || isDigit(c) || " " == c))
		{
			return false;
		}
	}

	return true;
}

function isLetterString(field)
{
	field = myTrim(field);

	var i;

	for (i = 0; i < field.length; i++)
	{
		var c = field.charAt(i);

		if (! isLetter(c) )
		{
			return false;
		}
	}

	return true;
}


function isRunNian(s){
	//alert(s%4);
	if(s%4!=0){
		return false;
	}else{
		if(s%100!=0){
			return true;
		}else{
			if(s%400==0){
				return true;
			}else{
				return false;
			}
		}
	}
}





 function getLastDay(year,month){
	var s = new Array("01","03","05","07","08","10","12");
	var s1=new Array("04","06","09","11");

	for(i=0;i< s.length;i++){
		if(month==s[i]){
			return "31";
		}
	}

	for(i=0;i<s1.length;i++){
		if(month==s1[i]){
			return "30";
		}
	}

	if(isRunNian(year)){
		return "29";
	}else{
		return "28";
	}

}



function isNumbers(field)
{
	field = myTrim(field);

	var i;

	for (i = 0; i < field.length; i++)
	{
		var c = field.charAt(i);

		if (!isDigit(c) )
		{
			return false;
		}
	}

	return true;
}

function getRadioGroupValue(obj) {
	for(var i=0; i<obj.length; i++) {
		if(obj[i].checked) {
			return obj[i].value;
		}
	}
}

function radio_active(radio_group)
{
	for(counter = 0 ; counter < radio_group.length ; counter++)
	{
		if(radio_group[counter].checked)
		{
			return counter;
		}
	}

	return -1;
}



function trim(str,ch) {
    if (!ch) ch = ' ';
    return str.replace(new RegExp("^" + ch + "+|" + ch + "+$", "g"), "");
}

function isInteger(field)
{
	s = myTrim(field);

	var i;

	if (isEmpty(field))
	{
		return false;
	}

	for (i=0; i<field.length; i++)
	{
		var c = field.charAt(i);

		if (!isDigit(c))
		{
			return false;
		}

		if(c==0&&i==0&&field.length>1)
		{
			return false;
		}
	}

	return true;
}



function isLetter(c)
{
	return ( ((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")) );
}



function isDigit(c)
{
	return ((c >= "0") && (c <= "9"));
}


function myTrim(str)
{
	var end = false;
	var ch;

	while(!end)
	{
		if (str.length == 0) break;
		ch = str.charAt(0);

		if (ch == ' ')
		{
			str = str.substring(1,str.length);
		}
		else
		{
			end = true;
		}
	}

	end = false;

	while(!end)
	{
		if (str.length == 0)
		{
			break;
		}

		ch = str.charAt(str.length-1);

		if (ch == ' ')
		{
			str = str.substring(0,str.length-1);
		}
		else
		{
			end = true;
		}
	}

	return str;
}





function myReset(w, h)
{
	var pox = (screen.width-w)/2;
	var poy = (screen.height-h)/2;
	window.resizeTo(w+15, h+10);
	window.moveTo(((pox>0&&pox<screen.width)?pox:0), ((poy>0&&poy<screen.height)?poy:0));
}



function isPrice(field)
{
	field = myTrim(field);
	var i;
	var seenDecimalPoint = false;

	if (isEmpty(field))
	{
		return false;
	}

	if (field == ".")
	{
		return false;
	}

	for (i=0; i<field.length; i++)
	{
		// Check that current character is number.
		var c = field.charAt(i);

		if ((c == ".") && !seenDecimalPoint)
		{
			seenDecimalPoint = true;
		}
		else if (!isDigit(c))
		{
			return false;
		}
	}
	if(seenDecimalPoint == true)
	{
	  var afterdot = field.substring(field.indexOf('.',0)+1).length;

	  if(afterdot > 2)
	  {
		 return false;
	  }
    }
	return true;
}

function isPrice(field,precision)
{
	field = myTrim(field);
	var i;
	var seenDecimalPoint = false;

	if (isEmpty(field))
	{
		return false;
	}

	if (field == ".")
	{
		return false;
	}

	for (i=0; i<field.length; i++)
	{
		// Check that current character is number.
		var c = field.charAt(i);

		if ((c == ".") && !seenDecimalPoint)
		{
			seenDecimalPoint = true;
		}
		else if (!isDigit(c))
		{
			return false;
		}
	}
	if(seenDecimalPoint == true)
	{
	  var afterdot = field.substring(field.indexOf('.',0)+1).length;

	  if(afterdot > precision)
	  {
		 return false;
	  }
	  if(afterdot <= 0 )
	  {
		  return false;		  
	  }
    }
	return true;
}

function calculatebytesize(field)
{
	field = myTrim(field);

	var i;
	var size=0;

	for (i = 0; i < field.length; i++)
	{
		var c = field.charAt(i);

		if ((c >= "!") && (c <= "\u20AC")||(c==" ") )
		{
			size=size+1;
		}
		else
		{
			size=size+3;
		}
	}

	return size;
}




function setLetterBorder(toneNameLetter)
{
	var imgName = "img" + toneNameLetter.toLowerCase();
	document.images[imgName].border = 2;

}



function setSelectValue(selectstart, value1, selectend, value2)
{
	if(selectstart.value == value1)
	{
		selectend.value = value2;
		selectend.disabled = true;
	}
	else
	{
		selectend.disabled = false;
	}
}


function checkHandPhone(phone , countrytype)
{


	if(isNaN(phone))
	{
		return 1;
	}


	if(countrytype == 1)
	{
		if(phone.length != 8)
		{
			return 2;
		}
		else if(phone.charAt(0) != '0')
		{
			return 3;
		}
		else
		{
			return 0;
		}
	}
	else
	{
		if(phone.length != 11)
		{
			return 2;
		}
		else if(phone.charAt(0) != '1' || phone.charAt(1) != '3')
		{
			return 3;
		}
		else
		{
			return 0;
		}
	}
}



function checkFixedPhone(phone)
{
	if(isNaN(phone))
	{
		return 1;
	}
	else if(phone.length == 0)
	{
		return 2;
	}
	else if (phone.length > 15)
	{
		return 3;
	}

	else if(phone.charAt(0) != '0')
	{
		return 4;
	}
	else if(	phone.length <10)
	{
		return 5;
	}
	else
	{
		return 0;
	}
}




function convertDBFormat(dbField)
{
	var returnStr = "";
	var fieldArray = dbField.split("'");

	for(var i = 0; i < fieldArray.length; i++)
	{
		if(i == fieldArray.length - 1)
		{
			returnStr = returnStr + fieldArray[i];
		}
		else
		{
			returnStr = returnStr + fieldArray[i] + "''";
		}
	}

	return returnStr;
}


function play(field)
{
	document.all.bgsound.src=field;
}




function round_decimals(original_number , decimals)
{
	var result1 = original_number * Math.pow(10 , decimals);
	var result2 = Math.round(result1);
	var result3 = result2 / Math.pow(10 , decimals);

	return(result3);
}




// Modified for Fixing the Defect ID: AA6D01310 By Jayesh Damodar Patel on 19-02-2007
/*function containInvalidChar(field)
{
	for (i = 0; i < field.length; i++)
	{
		var c = field.charAt(i);

		if(c == '?' || c == '&' || c == '<'
		   || c == '>' || c == '\'' || c == '"'
		   || c == '@' || c == '#'|| c == '\\'|| c == '`'
		   || c == ';' || c == '$' || c == '^' || c == '\/'|| c == '!' || c == '~' || c == '_'|| c == '%'|| c == ','|| c == '|'|| c == '+'|| c == '*')
		{
			return true;
		}
	}

	return false;
}*/

var reg = "$,^&<>\'\":;%#@!|=*()-_+}\]\[{?`./~";
function containInvalidChar(field)
{
	
	var i=0, j=0;
	for (i = 0; i < field.length; i++)
	{
		var c = field.charAt(i);
		for (j = 0; j < reg.length; j++)
		{	
			if(c == reg.charAt(j) )
			{
				return true;
			}
		}
	}
	return false;
}
//Added for caller name validation in group and addressbook
function containInvalidCharName(field)
{
	var i=0, j=0;
	for (i = 0; i < field.length; i++)
	{
		var c = field.charAt(i);
		for (j = 0; j < regName.length; j++)
		{	
			if(c == regName.charAt(j) )
			{
				return true;
			}
		}
	}
	return false;
}

// Modification for the Defect ID: AA6D01310 By Jayesh Damodar Patel Ends.


//Begin RBTV5.0D82
function containSpecialChar(field)
{
	for (i = 0; i < field.length; i++)
	{
		var c = field.charAt(i);

		if( c == '&' || c == '<' || c == '!' || c == '*'
		   || c == '>' || c == '"' || c == '(' || c == ')'
		   || c == '-' || c == '_' || c == '+' || c == '='
		   || c == '|' || c == ';' || c == ':' || c == '\''
		   || c == '.' || c == ',' || c == '?' 
		   || c == '[' || c == ']' || c == '{' || c == '}'
		   || c == '@' || c == '#'|| c == '\\'|| c == '`'
		   || c == '$' || c == '^' || c == '\/' || c == '~' || c == '%')
		{
			return true;
		}
	}

	return false;
}
//Begin RBTV5.0D82

function isPhoneNumber(field)
{
	for (i = 0; i < field.length; i++)
	{
		var c = field.charAt(i);

		if((!isDigit(c))&&c!='-')
		{
			return false;
		}
	}

	return true;

}



function converturlcode(field)
{
	field = field.replace('%','%25')
	field = field.replace('&','%26')
	field = field.replace('"','&quot;')
	field = field.replace('>','&gt;')
	field = field.replace('<','&lt;')
	field = field.replace('#','%23')
	field = field.replace('+','%2B')

	return field;
}






function dropit2(name)
{
	var zindex=100
	var sOpen=""
	var nMenuNum = name.substring(name.length - 1,name.length)

	sOpen="dropmenu" + nMenuNum

	var themenu=document.all[sOpen]

	if (themenu == null)
	{
		return
	}

	if (document.all)
	{
		themenu.style.left=document.body.scrollLeft+event.clientX-event.offsetX
		themenu.style.top=document.body.scrollTop+event.clientY-event.offsetY+25

		if (themenu.style.visibility=="hidden")
		{
			 themenu.style.visibility="visible"
			 themenu.style.zIndex=zindex++
		}
	}
}



function hidemenu(name)
{
	var zindex=100
	var sOpen=""
	var nMenuNum = name.substring(name.length - 1,name.length)
	sOpen="dropmenu" + nMenuNum
	var themenu=document.all[sOpen]

	if (themenu == null)
	{
		return;
	}

	var theID = window.event.toElement.id.substring(0,1)

	if(window.event.toElement.id!=sOpen && window.event.toElement.id!="link" )
	{
		themenu.style.visibility="hidden";
	}
}





function decomposeString(str, sperate1, sperate2)
{
	var returnArray = new Array();
	var tempArray = str.split(sperate1);
	var p = 0;

	for(i = 0; i < tempArray.length; i++)
	{
		var andArray = tempArray[i].split(sperate2);

		for(j = 0; j < andArray.length; j++)
		{
			if(andArray[j] != '' && andArray[j] != null)
			{
				returnArray[p++] = andArray[j];
			}
		}
	}

	return returnArray;
}


var new_window


function window_available()
{
	if(! new_window)
	{
		return false;
	}
	else if(new_window.closed)
	{
		return false;
	}
	else
	{
		return true;
	}
}


function play(url , toneName , backgroundmap)
{

	if(!window_available())
	{

		new_window = window.open('/auditionpage.htm' ,"", "width=200 , height=200");
		//new_window.close();
	}
	else
	{
		new_window.close();
		new_window = window.open('/auditionpage.htm' ,"", "width=0 , height=0");
	}



	new_window.MediaPlayer.FileName = url;
	//new_window.MediaPlayer.Play();

}



function validatetime(dateString)
{

	if(dateString.length!=8)
	{
		return false;
	}

	if(isNumbers(dateString.substring(0,2))==false
	   ||isNumbers(dateString.substring(3,5))==false
	   ||isNumbers(dateString.substring(6,8))==false)
	{
		return false;
	}

	if(dateString.charAt(2)!=':'||dateString.charAt(5)!=':')
	{
		return false;
	}

	var hour=parseInt(dateString.substring(0,2),10);
	var minute=parseInt(dateString.substring(3,5),10);
	var second=parseInt(dateString.substring(6,8),10);

	if(hour<24&&minute<60&&second<60)
	{
		return true;
	}
	else
	{
		return false;
	}

}


 var listenWindow;
function listen(toneCode,tongPath, toneName, singer)
{
	if(listenWindow != null)
	{
		 listenWindow.close();
	}
	var left = 20;//Math.floor( (screen.width - 400) / 2);
	var top = 20;//Math.floor( (screen.height - 300) / 2);
	var lisurl="../user/listentone.screen?toneCode="+toneCode+"&tonePath="+tongPath+"&toneName="+toneName+"&singer="+singer;
	listenWindow = window.open(lisurl,"listen","width=400,height=300,top="+top+",left="+left);
}


 var adminlistenWin
function adminlisten(toneType,tongPath, toneID, toneName)
{
	if(adminlistenWin != null)
	{
		 adminlistenWin.close();
	}
	var left = 20;//Math.floor( (screen.width - 400) / 2);
	var top = 20;//Math.floor( (screen.height - 300) / 2);
	var lisurl= "listentone.screen?toneType="+toneType+"&tonePath="+tongPath+"&toneID="+toneID+"&toneName="+toneName;
	adminlistenWin = window.open(lisurl,"listen","width=400,height=300,top="+top+",left="+left);
}


 var splistenWin;
function splisten(toneType,tongPath, toneID, toneName,callFrom)
{
	if(splistenWin != null)
	{
		 splistenWin.close();
	}
	var left = 20;//Math.floor( (screen.width - 400) / 2);
	var top = 20;//Math.floor( (screen.height - 300) / 2);
	var lisurl= "../sp/listentone.screen?toneType="+toneType+"&tonePath="+tongPath+"&toneID="+toneID+"&toneName="+toneName+"&callFrom="+callFrom;
	splistenWin = window.open(lisurl,"listen","width=400,height=300,top="+top+",left="+left);
}
<!--AA6D04283 begin-->
function splistenCheck(toneType,tongPath, toneID, toneName,callFrom,ivrSupportLanguage,toneBoxID)
{
	if(splistenWin != null)
	{
		 splistenWin.close();
	}
	var left = 20;//Math.floor( (screen.width - 400) / 2);
	var top = 20;//Math.floor( (screen.height - 300) / 2);
	var lisurl= "../sp/listentone.screen?toneType="+toneType+"&tonePath="+tongPath+"&toneID="+toneID+"&toneName="+toneName+"&callFrom="+callFrom+"&ivrSupportLanguage="+ivrSupportLanguage+"&toneBoxID="+toneBoxID;
	splistenWin = window.open(lisurl,"listen","width=400,height=300,top="+top+",left="+left);
}
<!--AA6D04283 end-->
 var corplistenWin;
function corplisten(toneType,tongPath, toneID, toneName)
{
	if(corplistenWin != null)
	{
		 corplistenWin.close();
	}
	var left = 20;//Math.floor( (screen.width - 400) / 2);
	var top = 20;//Math.floor( (screen.height - 300) / 2);
	corplistenWin = window.open("../corp/listentone.screen?toneType="+toneType+"&tonePath="+tongPath+"&toneID="+toneID+"&toneName="+toneName,"listen","width=400,height=300,top="+top+",left="+left);
}

//add by lirenming
 var cutToneWindow;
function cutTone(toneBoxId, toneId, tongPath, toneName, singer, toneOffsets)
{
	if(cutToneWindow != null)
	{
		 cutToneWindow.close();
	}
	var left = 20;//Math.floor( (screen.width - 400) / 2);
	var top = 20;//Math.floor( (screen.height - 300) / 2);
	var lisurl="../user/cuttone.screen?toneBoxID="+toneBoxId+"&toneID="+toneId+"&tonePath="+tongPath+"&toneName="+toneName+"&singer="+singer+"&toneOffsets="+toneOffsets;
	cutToneWindow = window.open(lisurl,"","width=600,height=350,top="+top+",left="+left);
}
function numberOnly() // onkeypress event
{
  var key = window.event.keyCode;
  if(( key > 47 && key < 58 ) || (key==8)|| (key==9)|| (key==13)|| (key==37)|| (key==38)
	|| (key==39)|| (key==40)|| (key==46) || ( key > 95 && key < 106 ))
	  window.event.returnValue = true;
  else {
	  window.event.returnValue = false;
  }
}


function trim(strValue)
{
	var iLTR, jRTL;
	var chr;


	for( iLTR = 0; iLTR < strValue.length; iLTR++ )
	{
		chr = strValue.charAt(iLTR) ;
		if( chr != " " ) break;
	}

	if( iLTR == strValue.length ) return "";


	for( jRTL = strValue.length - 1; jRTL >= 0; jRTL-- )
	{
		chr = strValue.charAt(jRTL);
		if( chr != " " ) break;
	}
	return strValue.substring(iLTR, jRTL + 1);
}


function trimZero(strValue)
{
	var iLTR;
	var chr;


	for( iLTR = 0; iLTR < strValue.length; iLTR++ )
	{
		chr = strValue.charAt(iLTR) ;
		if( chr != "0" ) break;
	}

	if( iLTR == strValue.length ) return "";

	return strValue.substring(iLTR, strValue.length);
}


function existChinese(strValue)
{
	var chrCode
	for(var iChar = 0; iChar < strValue.length; iChar++)
	{
		chrCode = strValue.charCodeAt(iChar);
		if(parseInt(chrCode) > 255)
		{
			return true;
		}
	}
	return false;
}



function formatInputNumber(oElement, length, decimal)
{
	var oInput = oElement;
	var oInputValue = trim(oInput.value);
	var iLowcase = oInputValue.indexOf("e");
	var iUpcase = oInputValue.indexOf("E");

	if( oInputValue == "")
	{
		oInput.value = "";
		return true;
	}

	if (existChinese(oInputValue))
	{
		oInput.value = "";
		return true;
	}

	if((iLowcase != -1)||(iUpcase != -1))
	{

		return true;
	}


	var bOverflow = false;
	var partInteger = "";
	var countIntegerLength = 0;
	var partDecimal = "";
	var countDecimalLength = 0;

	var iPoint = oInputValue.indexOf(".");

	var allowIntegerLength = length - decimal - 1;
	var allowDecimalLength = decimal;


	if(iPoint == -1)
	{
		partInteger = oInputValue;
		partInteger = trimZero(partInteger);
		countIntegerLength = oInputValue.length;
	}
	else
	{
		partInteger = oInputValue.substring(0,iPoint);
		partInteger = trimZero(partInteger);
		countIntegerLength = partInteger.length;

		partDecimal = oInputValue.substring(iPoint + 1, iPoint + 1 + allowDecimalLength);
		countDecimalLength = partDecimal.length;
	}
	if (partInteger == "")
	{
		partInteger = "0";
	}


	if(countIntegerLength > allowIntegerLength)
	{
		partInteger = "0";
		bOverflow = true;
	}


	if(countDecimalLength < allowDecimalLength)
	{
		for (var iDecimal = 0; iDecimal < (allowDecimalLength - countDecimalLength); iDecimal++)
			partDecimal = partDecimal + "0";
	}


	if (partDecimal != "")
	{
		oInput.value = partInteger + "." + partDecimal;
	}
	else
	{
		oInput.value = partInteger
	}
	if (bOverflow) oInput.focus();
}


function clearValue(obj){
	obj.value = "";
}

//Added for defect AA6D03679. Begin
var calendarFlag = false;
var layerFlag = false;
var found =false;
var elementid = ["RBTstatusList","SPList","MainList","ChildList","calendarlayer"];
document.onmousedown = function(event)
{
	var targ;
	var e = window.event;
	if(!e)
		e=event;
	var i=0;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
	targ = targ.parentNode; // Get the tag on which mouse action occured
	var tname
	tname=targ.tagName
	
	var src;
	
	if (tname=='IMG') {
		   src =targ.src;
		   if(src.indexOf("selectdate.gif")>0 || src.indexOf("shezhi.gif")>0 ||src.indexOf("shezhiriqi.gif")>0)
			   found=true;
	}
    
	if (found)
	{
		document.all.calendarlayer.onmousedown = function() {
		calendarFlag = true;
		}
	}
	if(!targ.className || ( targ.className && targ.className != 'systablebg')) {
	
	   for(i=0; i<elementid.length;i++){
		  
		var layer = document.getElementById(elementid[i].toString());
		if(elementid[i].toString()!= 'calendarlayer' && !layerFlag && layer && layer.style)
				layer.style.display = "none";
		
		}
	  
	}
  
 if(!calendarFlag && document.all.calendarlayer )
		document.all.calendarlayer.style.visibility = "hidden";
			
		   
 calendarFlag = false;
 layerFlag = false;


}	
//Function for address book display in single select
function showAddressBookSingle()
{
	var url = "/user/queryaddressbookpopup.do?page=1";
	openAddressWindow(url,"width=700,height=500,top=100,left=100,scrollbars=1");
}
//Function for address book display in single select
function showAddressBookMultiple()
{
	var url = "/user/queryaddressbookpopupmultiple.do?page=1";
	openAddressWindow(url,"width=700,height=500,top=100,left=100,scrollbars=1");
}
function openAddressWindow(url,winprops)
{
    var targetName = "Addressbook";
	var winHandler;
	winHandler=window.open('',targetName, winprops);
	winHandler.close();
	winHandler = window.open(url, targetName, winprops);
}

//End
//Added for DB0
function passval(field)
{
	field = trimEnter(field);
	var re = /^[a-zA-Z0-9!()*-.:=?\[\]_{}]+$/;
	if (re.test(field))
	{
		return true;
	}
	else
	{
				
		return false;
	}
}
//End

//<DB1 start>
//<Added by Ashok>
function viewTariffDetails(tariffID, brandID, defaultPrice, location)
{
    var url = "/admin/viewtariffdetails.screen?tariffID=" + tariffID + "&brandID=" + brandID + "&defaultPrice=" + defaultPrice + "&location=" + location;
    openWindow(url,"width=600,height=500,top=100,left=100,scrollbars=1");
}

function openWindow(url,winprops)
{
    var targetName = "Create";
	var winHandler;
	winHandler=window.open('',targetName, winprops);
	winHandler.close();
	winHandler = window.open(url, targetName, winprops);
}

function getLeft(mainStr,lngLen) {
	if (mainStr) {
		if(!lngLen)
		{
			var lngLen = mainStr.length-2;
		}
		return mainStr.substring(0,lngLen)
	}
	else
	{
		return null
	}
}
function subMenuTrOver(trName,imgName,cName) {
	// Deleted by Sree to support Mozilla - 23-10-2007 
	trName.className = cName;
	imgName.src = "images/icon_sub_menu_on.gif";
}


function subMenuTrOut(trName,imgName,cName) {
	// Deleted by Sree to support Mozilla - 23-10-2007 
	trName.className = cName;
	imgName.src = "images/icon_sub_menu_off.gif";
}

var theDivID,theTableID,theMenuLength;
function runMenu(divID,tableID,menuLength) {
	// Modified by Sree to support Mozilla - 18-10-2007 - Start
	var thisDivID = divID;
	var thisTableID = tableID;
	// Modified by Sree to support Mozilla - 18-10-2007 - End

	var thisMenuLength = parseInt(menuLength,10);
	var oldDivID = menuCotral.openDivID;
	var oldTableID = menuCotral.openTableID;
	var oldMenuLength = menuCotral.openMenuLength;
	if(oldDivID)
	{
		oldMenuLength = parseInt(oldMenuLength,10);
	}
	var runMenuFun;
	if(!runMenuFun)
	{
		if(oldDivID=="")
		{
			openMenu(thisDivID,thisTableID,thisMenuLength);
			
			
		}
		else
		{
			if(oldDivID==divID)
			{
				closeMenu(thisDivID,thisTableID,thisMenuLength);
			}
			else
			{
				closeMenu(oldDivID,oldTableID,oldMenuLength,thisDivID,thisTableID,thisMenuLength);
			}
		}
	}
}

function openMenu(theDivID,theTableID,theMenuLength) {

	// Modified by Sree to support Mozilla - 18-10-2007 - Start
	theDivIDelem = document.getElementById(theDivID);
	theTableIDelem=document.getElementById(theTableID);
	
	thisDiv = theDivID;
	thisTable = theTableID;
	thisLen = theMenuLength;
	divHeight = parseInt(getLeft(theDivIDelem.style.height),10);
	divHeight += thisLen/5;
	theDivIDelem.style.height = divHeight+"px";
	if(theDivIDelem.style.display != "block")
	{
		theDivIDelem.style.display = "block";
	}
	if((divHeight+thisLen/5)>theMenuLength)
	{
		menuCotral.openDivID = thisDiv;
		menuCotral.openTableID = thisTable;
		menuCotral.openMenuLength = thisLen;
		clearTimeout(runMenuFun);
	}
	else
	{
		theTableIDelem.src = "images/bullet5.gif";
		// Modified by Sree to support Mozilla - 18-10-2007 - End
		runMenuFun=setTimeout("openMenu(thisDiv,thisTable,thisLen)","1");
	}

}


function closeMenu(theDivID,theTableID,theMenuLength,toDivID,toTableID,toMenuLength) {
	// Modified by Sree to support Mozilla - 18-10-2007 - Start
	// Any open menu on clicking the Root menu (not having Submenus) can be closed
	if (theDivID == null && theTableID == null && theMenuLength == null && toDivID == null && toTableID == null && toMenuLength == null)
	{
		var oldDivID = menuCotral.openDivID;
		var oldTableID = menuCotral.openTableID;
		var oldMenuLength = menuCotral.openMenuLength;
		// Modified by Sree to support Mozilla - 23-10-2007 - Start
		if (oldDivID && oldTableID)
		{
			closeMenu(oldDivID,oldTableID,oldMenuLength)
		}
		// Modified by Sree to support Mozilla - 23-10-2007 - End
		return;
	}

	theDivIDelem = document.getElementById(theDivID);
	theTableIDelem=document.getElementById(theTableID);

	thisDiv = theDivID;
	thisTable = theTableID;
	thisLen = theMenuLength;

	divHeight =  parseInt(getLeft(theDivIDelem.style.height),10);

	divHeight -= thisLen/5;
	theDivIDelem.style.height = divHeight+"px";

	theTableIDelem.src = "images/bullet4.gif";

	if((divHeight-thisLen/5)<=0)
	{

		menuCotral.openDivID = "";
		menuCotral.openTableID = "";
		menuCotral.openMenuLength = "";

		theDivIDelem.style.display = "none";
		theDivIDelem.style.height = "0px";
		
		// Modified by Sree to support Mozilla - 18-10-2007 - End

		clearTimeout(runMenuFun);
		if(toDivID)
		{
			openMenu(toDivID,toTableID,toMenuLength);
		}
	}
	else
	{
		if(toDivID)
		{
			thisToDiv = toDivID;
			thisToTable = toTableID;
			thisToLen = toMenuLength;
			runMenuFun=setTimeout("closeMenu(thisDiv,thisTable,thisLen,thisToDiv,thisToTable,thisToLen)",5);
		}
		else
		{
			runMenuFun=setTimeout("closeMenu(thisDiv,thisTable,thisLen)",5);
		}
	}
}

function stopEventRunMenu(event, index, subMenuLength, obj) {
	var agt=navigator.userAgent.toLowerCase();
    if(agt.indexOf('gecko')!=-1) {
		event.preventDefault();
		obj.addEventListener("onclick", runMenu('menuDiv' + index, 'menuImg' + index, subMenuLength+19), false);
	}
	else 
		runMenu('menuDiv' + index, 'menuImg' + index, subMenuLength);
}

function stopEventNoSubMenu(event, linkValue, closeOrNot) {
// Modified by Sree to support Mozilla - 23-10-2007 - End
	var agt=navigator.userAgent.toLowerCase();
    if(agt.indexOf('gecko')!=-1) {

		event.preventDefault();
	}
	// Modified by Sree to support Mozilla - 23-10-2007 - Start
	if (!closeOrNot && closeOrNot != 0)	{
		closeMenu();
	}
	// Modified by Sree to support Mozilla - 23-10-2007 - End
	if(linkValue.indexOf('.jsp')!=-1) {
		document.location.href = linkValue;
	} else {
		eval(linkValue);
	}
}


function showMenu(allMenuStr) {
	var agent =navigator.userAgent.toLowerCase();
	
	if(pageStyle == "myring")
	{
		menuClassOn = "myring_menu_on";
		menuClassOff = "myring_menu";
		subMenuClassOn = "txt_list_song";
		subMenuClassOff = "text_link";
		subMenuClassOver = "myring_submenu_over";
		menuBgClass = "myring_menu_bg";
	}
	if(pageStyle == "info")
	{
		menuClassOn = "info_menu_on";
		menuClassOff = "info_menu";
		subMenuClassOn = "info_submenu_on";
		subMenuClassOff = "info_submenu";
		subMenuClassOver = "info_submenu_over";
		menuBgClass = "info_menu_bg";
	}
	if(pageStyle == "commend")
	{
		menuClassOn = "commend_menu_on";
		menuClassOff = "commend_menu";
		subMenuClassOn = "commend_submenu_on";
		subMenuClassOff = "commend_submenu";
		subMenuClassOver = "commend_submenu_over";
		menuBgClass = "commend_menu_bg";
	}
	if(pageStyle == "ontop")
	{
		menuClassOn = "ontop_menu_on";
		menuClassOff = "ontop_menu";
		subMenuClassOn = "ontop_submenu_on";
		subMenuClassOff = "ontop_submenu";
		subMenuClassOver = "ontop_submenu_over";
		menuBgClass = "ontop_menu_bg";
	}
	if(pageStyle == "browse")
	{
		menuClassOn = "browse_menu_on";
		menuClassOff = "browse_menu";
		subMenuClassOn = "browse_submenu_on";
		subMenuClassOff = "browse_submenu";
		subMenuClassOver = "browse_submenu_over";
		menuBgClass = "browse_menu_bg";
	}
	if(pageStyle == "help")
	{
		menuClassOn = "help_menu_on";
		menuClassOff = "help_menu";
		subMenuClassOn = "help_submenu_on";
		subMenuClassOff = "help_submenu";
		subMenuClassOver = "help_submenu_over";
		menuBgClass = "help_menu_bg";
	}
	this.openDivID = "";
	this.openTableID = "";
	this.openMenuLength = "";

	var tempMenuStr = new Array();
	var htmlStr = "";

    aMenuStr = allMenuStr.split("||");
	for(i=0;i<aMenuStr.length;i++)
	{

		if(aMenuStr[i].indexOf("|")>0)
		{
			tempMenuStr = aMenuStr[i].split("|");
			menuPro = tempMenuStr[0].split(",");
			menuState = menuPro[0];
			menuName = menuPro[1];
			if (menuPro.length>2) {
				menuLink = menuPro[2];
				linkHeadStr = '<a>';
				linkFootStr = '</a>';
			}

			subMenuLength = (tempMenuStr.length-1)*25;


			if (menuState=="Y") {
				menuClass = menuClassOn;
				menuIcon = "images/bullet5.gif";
				linkHeadStr = '';
				linkFootStr = '';
				menuAct = '';
			}
			else
			{
				menuClass = menuClassOff;
				menuIcon = "images/bullet4.gif";
				// Modified by Sree to support Mozilla - 18-10-2007 - Start
				menuAct = ' style="cursor: pointer; cursor: hand;" onClick="stopEventRunMenu(event, '+i+','+subMenuLength + ', this)"';
				// Modified by Sree to support Mozilla - 18-10-2007 - End

			}


			divDisplay = "none";
			divHeight = "0px";
			for(m=1;m<tempMenuStr.length;m++)
			{
				subMenuPro = tempMenuStr[m].split(",");
				if(subMenuPro[0]=="Y") {

					/*
					this.openDivID = "menuDiv" + i + "";
					this.openTableID = "menuImg" + i + "";
					this.openMenuLength = (tempMenuStr.length-1)*25;
					*/

					divHeight = (tempMenuStr.length-1)*25 + "px";

					divDisplay = "block";
					menuIcon = "images/bullet5.gif";
					menuAct = '';
				}
			}


			htmlStr += '<table width="100%" border="0" cellpadding="0" cellspacing="0">';
			htmlStr += '<tr id="menuTr' + i + '" '+ menuAct +'>';
			htmlStr += '<td width="21" height="25" align="center"><img src="' + menuIcon + '" width="11" height="9" id="menuImg' + i + '" /></td>';
			htmlStr += '<td align="left" class="text_link">' + linkHeadStr + menuName + linkFootStr + '</td>';
			htmlStr += '</tr></table>';
			
			if(agent.indexOf('gecko')!=-1){
			
			htmlStr +='<div style="width:100%;height:'+ ';display:' + divDisplay + ';overflow:;" id="menuDiv' + i + '">';
			} 
			
			if(agent.indexOf('msie')!=-1){
			
			htmlStr +='<div style="width:100%;height:' + divHeight + ';display:' + divDisplay + ';overflow:;" id="menuDiv' + i + '">';
			}
			
			//htmlStr +='<div style="width:100%;height:' + divHeight + ';display:' + divDisplay + ';overflow:;" id="menuDiv' + i + '">';
			
			htmlStr += '<table width="100%" border="0" cellpadding="0" cellspacing="0" id="menuTable' + i + '">';

			for(n=1;n<tempMenuStr.length;n++)
			{

				subMenuPro = tempMenuStr[n].split(",");
				subMenuName = subMenuPro[1];
				if (subMenuPro.length>2) {
					
					subMenuLink = subMenuPro[2];
					// Modified by Sree to support Mozilla - 23-10-2007 - Start
					subLinkHeadStr = '<a onclick="stopEventNoSubMenu(event, \'' + subMenuLink +'\', 0)">';
					// Modified by Sree to support Mozilla - 23-10-2007 - End
					subLinkFootStr = '</a>';
				}
				else
				{
					subLinkHeadStr = '';
					subLinkFootStr = '';
				}


				if(subMenuPro[0]=="Y") {
					subMenuClass = subMenuClassOn;
					subMenuIcon = "images/icon_sub_menu_on.gif";
//					cursorType = "pointer; cursor: hand;";
					cursorType = "pointer; cursor: hand;";
//					subLinkHeadStr = '';
//					subLinkFootStr = '';
					subMenuAct = '';
				}
				else
				{
					
					subMenuClass = subMenuClassOff;
					subMenuIcon = "images/icon_sub_menu_off.gif";
					// Modified by Sree to support Mozilla - 23-10-2007 - Start
					//subMenuAct = ' onmouseover=\'subMenuTrOver(this,subMenuImg'+ i +'' + n + ',"'+subMenuClassOver+'");\' onmouseout=\'subMenuTrOut(this,subMenuImg'+ i +'' + n + ',"'+subMenuClassOff+'");\'';
					// Modified by Sree to support Mozilla - 23-10-2007 - End
					cursorType = "pointer; cursor: hand;";
				}

				htmlStr += '<tr bgcolor="#e5f3c7" style="cursor: ' + cursorType + ';" id="subMenuTr'+ i +'' + n + '">';
				htmlStr += '<td width="21" height="25">&nbsp;</td>';
				// Modified by Sree to support Mozilla - 23-10-2007 - Start
				//htmlStr += subLinkHeadStr;
				// Modified by Sree to support Mozilla - 23-10-2007 - End
				htmlStr += '<td align="left" class="' + subMenuClass + '">' + subLinkHeadStr + subMenuName + subLinkFootStr + '</td>';
				//htmlStr += subLinkFootStr;
				htmlStr += '</tr>';

			}
			htmlStr +='</table></div>';
		}
		else
		{
			menuPro = aMenuStr[i].split(",");
			menuState = menuPro[0];
			menuName = menuPro[1];

			if (menuPro.length>2) {
				menuLink = menuPro[2];
				// Modified by Sree to support Mozilla - 23-10-2007 - Start
				linkHeadStr = '<a onclick="stopEventNoSubMenu(event, \'' + menuLink +'\')">';
				// Modified by Sree to support Mozilla - 23-10-2007 - End
				linkFootStr = '</a>';
			}
			else
			{
				linkHeadStr = '';
				linkFootStr = '';
			}


			if (menuState=="Y") {
				menuClass = menuClassOn;
				menuIcon = "images/bullet4_2.gif";
//				linkHeadStr = '';
				// Modified by Sree to support Mozilla - 18-10-2007 - Start
				linkHeadStr = '<a onclick="stopEventNoSubMenu(event, \'' + menuLink +'\')">';
				linkFootStr = '</a>';
				// Modified by Sree to support Mozilla - 18-10-2007 - End

//				menuAct = '';
				menuAct = ' style="cursor: pointer; cursor: hand;"';
			}
			else
			{
				menuClass = menuClassOff;
				menuIcon = "images/bullet4.gif";
				menuAct = ' style="cursor: pointer; cursor: hand;"';
			}
			// Added by praveen to not to show menu if allmenustr is null
			if (!menuName)
			{
					menuName="";
			}
			//End add 

			htmlStr += '<table width="100%" border="0" cellpadding="0" cellspacing="0">';
			htmlStr += '<tr id="menuTr' + i + '" '+ menuAct +'>';
			htmlStr += '<td width="21" height="25">';
			if(menuName && menuName.length>0)
			htmlStr += '</td>';
			
			htmlStr += '<td align="left" class="text_link">' + linkHeadStr + menuName + linkFootStr + '</td>';
			htmlStr += '</tr></table>';
		}

	}
	document.write(htmlStr);
}



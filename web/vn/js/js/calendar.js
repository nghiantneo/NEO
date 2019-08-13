


	function setDate(obj,date, month, year) {
		var lastDayInMonth = getDayOfMonth(month,year);
		var now = new Date();
		for (i=1900; i<=now.getFullYear(); i++){
			obj.StartYear.options[i-1900] = new Option(i,i);
			if (year == i) obj.StartYear.options[i-1900].selected = true;
		}
		for (i=1; i<=lastDayInMonth; i++){
			if (i<10) {
				obj.StartDay.options[i-1] = new Option("0"+i,"0"+i);
			} else {
				obj.StartDay.options[i-1] = new Option(i,i);
			}
			if (date == i) obj.StartDay.options[i-1].selected = true;
		}	
		for (i=0; i<12; i++){
			if (month == i+1) obj.StartMonth.options[i].selected = true;
		}
		//checkDate();
	}

	function checkDate1(objDay,objMonth) {
		var now = new Date();
		var date = objDay.value;		
		var month = objMonth.value;

		var songay = getDayOfMonth(month,now.getFullYear());
		objDay.options[28] = new Option(29,29);
		objDay.options[29] = new Option(30,30);
		objDay.options[30] = new Option(31,31);
		for (i=songay; i<32; i++) objDay.options[songay] = null
		if (date>songay) {
			objDay.options[songay-1].selected=true;
		} else {
			objDay.options[date-1].selected=true;
		}
	}
	
	function changeDate(obj){
		var date = obj.StartDay.value+"";
		var month = obj.StartMonth.value+"";
		if (date.length <2) month = "0" + date
		if (month.length<2) month = "0" + month
		var year = obj.StartYear.value+"";
		//obj.cmd.value = "";
		//obj.day.value = date+month+year;
	}

	function getDayOfMonth(month,year){
		var result=0;
		if ((month==1) || (month==3) || (month==5) || (month==7) || (month==8) || (month==10) || (month==12)) result=31;
		if ((month==4) || (month==6) || (month==9) || (month==11)) result=30;
		if (month==2) {
			if (leapYear(year)==true) result=29
			else result = 28;
		}
		return result;		
	}

	function leapYear(year){
		var result = false;
		if (year % 4 == 0) result = true;
		if ((year % 100 == 0)&&(year % 400 != 0)) result = false;
		return result;
	}
	function content_onkeypress(){
		if (document.form.content_show.value.length >160) {
			alert("Noi dung lich lam viec khong duoc nhieu hon 160 ky tu.");
			document.form.content_show.value = document.form.content_show.value.substring(0,160);
		}
		//if (!document.all) return;
		//char_number.innerHTML = document.form.content.value.length;
	}
	function add_new_row()
	{
		if (document.form.content_show.value == "")
		{
			alert("Ban phai nhap noi dung lich lam viec!");
		} 
		else if(!isMobile(document.form.subscode.value))
		{
			alert("Hien nay chi cho phep gui Tin nhan den may dien thoai di dong o Vietnam.\nMong quy khach vui long nhap lai so dien thoai!");		 
			document.form.subscode.focus();			
		}
		else 
		{
			var id = 0;
			var content = document.form.content_show.value;
			for (id=0;id<content.length;id++){
				if (content.substring(id,id+1)=="&"){
					content = content.substring(0,id)+"&amp;"+content.substring(id+1,content.length);
					id = id + 4;
				}
			}
			document.form.content.value=content;
			document.form.cmd.value = "them"
			document.form.submit();
		}
	}
	function delete_this_row(id){
		document.form.cmd.value = "xoa";
		document.form.calendar_id.value = id;
		document.form.submit();
	}
	function repair_this_row(id){
		document.form.cmd.value = "sua";
		document.form.calendar_id.value = id;
		document.form.submit();
	}
	function other_date(day){
		document.form.cmd.value = "";
		document.form.day.value = day;
		document.form.submit();
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	function isNum(field) {
		
		var valid = "0123456789";
		var ok = "yes";
		var temp
		for (var i=0; i < field.value.length; i++){
			temp = "" + field.value.substring(i, i+1)
			if (valid.indexOf(temp) == "-1") ok = "no"
		}
		if (ok == "no")	return true
		else return false
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	function checksubscode(f) 
	{   	   	 	   
	   if (isNum(f))
		{
		  alert("So dien thoai co chua mot ky tu khong hop le.\nMong quy khach vui long nhap lai!");

		  var valid = "0123456789";
		  for (var i=0; i < f.value.length; i++) 
			if (valid.indexOf(f.value.charAt(i)) == "-1") {
				f.value=f.value.substring(0,i);
				break;
				f.focus();
				return false;
			}
	   }
	   return true;
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	function isMobile(mobileNumber)
	{	
		var len = mobileNumber.length;	
		if (len > 12 || len < 10) return false;
		if ((mobileNumber.charAt(0) != '9')	
			&& (mobileNumber.charAt(0) != '8' || mobileNumber.charAt(1) != '4' || mobileNumber.charAt(2) != '9' || len != 11)
			&& (mobileNumber.charAt(0) != '0' || mobileNumber.charAt(1) != '9' || len != 10)
			&& (mobileNumber.charAt(0) != '8' || mobileNumber.charAt(1) != '4' || mobileNumber.charAt(2) != '1')
			&& (mobileNumber.charAt(0) != '0' || mobileNumber.charAt(1) != '1' || len != 11))	
			return false;

		for (i = 1; i < len; ++i)
		{
			var curChar = mobileNumber.charAt(i);
			if (curChar < '0' || curChar > '9') return false;
		}
		return true;
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	function getDayOfDate(day,month,year){
		var myDays= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
		var date = new Date(year, month-1, day)
		var thu=date.getDay()
		return myDays[thu]
	}

	function replaceAll (streng, soeg, erstat){
		var st = streng;
		if (soeg.length == 0) return st;
		var idx = st.indexOf(soeg);
		while (idx >= 0) {
			st = st.substring(0,idx) + erstat + st.substr(idx+soeg.length);
			idx = st.indexOf(soeg);
		}
		return st;
	}



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

function getResponse(ip)
{
	$.ajax({
	type: 'POST',
	url: 'http://freegeoip.net/csv/'+ip,
	data: {},
	dataType: 'json',
	success: function(data) 
	{ alert(data); },
	error: function() { alert('something bad happened'); }
	});

}

function error(t){
	if (LOG_DEEP > 0) {
		console.error(t);
		// CONSOLE.outbr(t);	
		// TODO: mandar tbm pro console do linux		
	}
}
function warn(t){
	if (LOG_DEEP > 1) {
		console.warn(t);
		// CONSOLE.outbr(t);
		// TODO: mandar tbm pro console do linux		
	}
}
function log(t){
	if (LOG_DEEP > 2) {
		console.log(t);
		// CONSOLE.outbr(t);
		// TODO: mandar tbm pro console do linux
	}
}
function trace(t){
	if (LOG_DEEP > 3) {
		console.log(t);
	}
}
function debug(t){
	if (LOG_DEEP > 4) {
		console.log(t);
	}
}

function getParams(txt) {
	txt += " ";
	var pos = txt.indexOf(' ');
	var command = txt.substr(0, pos);
	var params = txt.substr(pos + 1, txt.length);
	return [command, $.trim(params)];
}


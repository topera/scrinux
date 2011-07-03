API.install('kill', function (param){
	console.log(param);
	// usage
	// kill a process: kill 3340
	// sleep a process: kill -STOP 3340
	// wake a process: kill -CONT 3340
	var r = "";
	var split = param.split(" ");
	if (split.length == 1 && param != "") {
		if (split[0] == "--help") {
			r = help();
		} else {
			r = API.cpu.kill(split[0]);		
		}
	} else if (split.length == 2) {
		if (split[0] == "-STOP") {
			r = API.cpu.sleep(split[1]);
		} else if (split[0] == "-CONT") {
			r = API.cpu.wake(split[1]);			
		}
	} else {
		r = help();
	}
	return r;
	
	function help(){
		var r = "";
		r += "Kill usage:\n";
		r += "\nkill 'pid' - kill process 'pid'";
		r += "\nkill -STOP 'pid' - sleep process 'pid'";
		r += "\nkill -CONT 'pid' - wake up process 'pid'";
		return r;
	}
});

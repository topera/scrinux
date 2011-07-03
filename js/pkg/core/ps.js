API.install('ps', function (param){
	var r = "PID\tTTY\tTIME\t\tSTATE\tCMD";
	$(RESOURCES.processes).each(function(i, it){
		// TODO: variar tty
		r += "\n" + it.pid + "\ttty1\t" + it.start.elapsedTime() + "\t" +  it.getStateCode() + "\t" + it.command;
	});
	return r;
});

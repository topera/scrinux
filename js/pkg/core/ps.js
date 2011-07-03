API.install('ps', function (param){
	var r = "PID TTY\tTIME CMD";
	$(RESOURCES.processes).each(function(i, it){
		// TODO: variar tty
		r += "\n" + it.pid + " tty1\t" + it.start.elapsedTime() + " " + it.command;
	});
	return r;
});

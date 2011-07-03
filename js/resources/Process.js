function Process(pid, command, closure){
	
	var _this = this;
	_this.codes = {"ready": "R", "running": "R+", "sleep": "S", "waiting": "D"};
	
	_this.pid = pid; // id do processo
	/*
	 * states:
	 * - R:		ready:		ready to use, after creation, unsserialization or a sucessfull run
	 * - R+:	running:	running in this exact moment (rare to be seen)
	 * - S:		sleep:		suspended process by user solicitation
	 * - D:		waiting:	wainting a device to be free (like disk) - TODO: to be implemented
	 */
	_this.state = "ready";
	_this.start = new Date();
	_this.command = command;
	_this.closure = closure;

	// processo eh executado
	_this.run = function(){
		_this.state = "running";
		debug("Process " + pid + " running!");
		(_this.closure)();
		_this.state = "ready";
	}
	
	_this.getStateCode = function() {
		return _this.codes[_this.state];
	}

}


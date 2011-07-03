function Process(pid, command, closure){
	
	var _this = this;
	
	_this.pid = pid; // id do processo
	_this.start = new Date();
	_this.command = command;
	_this.timer; // timer deste processo...usado no kill
	_this.closure = closure;

	// processo eh executado
	_this.run = function(){
		debug("Process " + pid + " running!");
		(_this.closure)();
	}
	
}


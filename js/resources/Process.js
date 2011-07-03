function Process(pid, command){
	
	var _this = this;
	
	_this.pid = pid; // id do processo
	_this.start = new Date();
	_this.command = command;
	_this.timer; // timer deste processo...usado no kill

	// processo eh executado
	_this.run = function(){
		log("Process " + pid + " running!");		
	}
	
}


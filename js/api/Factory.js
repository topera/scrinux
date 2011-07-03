function Factory(){
	var _this = this;
	
	// TODO: centralize all "new" commands here
	this.newProcess = function(pid, command, closure){
		return new Process(pid, command, closure);	
	}
	
}
API.factory = new Factory();
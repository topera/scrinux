function Factory(){
	var _this = this;
	
	// TODO: centralize all "new" commands here
	this.newProcess = function(pid, command){
		return new Process(pid, command);	
	}
	
}
API.factory = new Factory();
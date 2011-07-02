function Process(pid){
	
	var _this = this;
	
	_this.pid = pid; // id do processo
	_this.timer; // timer deste processo...usado no kill

	// processo eh executado
	_this.run = function(){
		log("Process " + pid + " running!");		
	}
	
}


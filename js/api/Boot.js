function Boot(){
	
	var _this = this;
	
	this.init = function(){
		log("Booting scrinux.");
		API.console.init();
		API.console.outbr("Starting Linux");
		API.console.outbr("Linux version 0.0.10 (topera@gmail)");
		API.console.updateCaret();
		API.loader.init();		
	};
	
	this.reboot = function(){
		log("Rebooting NOW!");
		API.console.destroy();		
		_this.init();
	};	
	
}
API.boot = new Boot();


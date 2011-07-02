function System(){
	
	var _this = this;
	
	this.events = function(){
	};
	
	this.run = function(txt){
		var m = "Command not found";
		var tmp = getParams(txt);
		var command = tmp[0];
		var params = tmp[1];		
		if (API.pkgs[command]) {
			m = API.pkgs[command](params);
		}
		return m;
	};	

}
API.system = new System();


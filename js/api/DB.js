function DB(){
	
	var _this = this;
	var key = "RESOURCES";	
	
	
	_this.flush = function() {
		try {
			localStorage.setItem(key, JSON.stringifyCustom(RESOURCES));
		} catch (e) {
			// TODO: melhorar isso
			console.log(e)
			alert("Disk is full");
		}
	}
	
	_this.load = function() {
		RESOURCES = JSON.parseCustom(localStorage.getItem(key));
		if (!RESOURCES) {
			RESOURCES = new Resources(new File("/", "D", "/"), [], "TODO");
		}
	}
	
	_this.clear = function() {
		localStorage.clear();
	}
	
	_this.total = function(){
		if ($.browser.mozilla) {
			return 5242878; // 5.0M
			//return new Number(52428800); // 50M
		} else if ($.browser.webkit) {
			return new Number(2621440);	// 2.5M
		}
		return new Number(5 * 1024 * 1024); // default 5MB
	}
	
	_this.usage = function(){
		if (localStorage.RESOURCES) {
			return new Number(localStorage.RESOURCES.length);
		} else {
			return new Number(0);
		}
	}
	
	_this.usagePercent = function(){
		return Math.round((_this.usage()/_this.total()) * 100);
	}
	
	_this.free = function(){
		return new Number(_this.total() - _this.usage());
	}
	
}
API.DB = new DB();




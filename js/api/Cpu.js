function Cpu(){
	
	var _this = this;
	
	// creates a new cpu process
	_this.newProcess = function(command, closure){
		debug("Creating new process...");
		var p = API.factory.newProcess(_this.createPID(), command, closure);
		var t = window.setInterval(p.run, SLEEP_TIME);
		p.timer = t;
		RESOURCES.processes.push(p);
	}

	// processo esta indo dormir (ficar pausado)
	/*
	_this.isAlive = function(pid){
	}*/	
	
	// processo esta indo dormir (ficar pausado)
	_this.sleep = function(pid){
		debug("Process " + pid + " going sleep...");
		var p = _this.getProcessByPID(pid).process;
		if (p) {
			if (p.timer) {
				window.clearInterval(p.timer);
				p.timer = null;
			} else {
				return "Warning: Process " + pid + " are already sleeping.";				
			}
		} else {
			return "Error: Process " + pid + " not found.";
		}		
	}

	// processo acorda
	_this.wake = function(pid){
		debug("Process " + pid + " waking up...");
		var p = _this.getProcessByPID(pid).process;
		if (p) {
			if (p.timer) {
				return "Warning: Process " + pid + " are not sleeping.";				
			} else {
				p.timer = window.setInterval(p.run, SLEEP_TIME);				
			}
		} else {
			return "Error: Process " + pid + " not found.";
		}
	}
	
	// mata processo
	_this.kill = function(pid){
		var r = _this.getProcessByPID(pid);
		if (r.process) {
			window.clearInterval(r.process.timer);
			RESOURCES.processes.remove(r.index);
		} else {
			return "Error: Process " + pid + " not found.";
		}
		debug("Process " + pid + " is killed!");
		return "";
	}
	
	// TODO: varrer pra ver se id sorteado ja nao existe
	_this.createPID = function(){
		return 1000 + new Number(Math.round(Math.random() * 1000));		
	}
	
	// retorna processo pelo id dele
	_this.getProcessByPID = function(pid){
		var r = {process: null, index: null}; 
		$(RESOURCES.processes).each(function(i, it){
			if (it.pid == pid) {
				r = {process: RESOURCES.processes[i], index: i};
				return false; // break
			}			
		});
		return r;
	}
	
}
API.cpu = new Cpu();

function Cpu(){
	
	var _this = this;
	
	// factory de processos
	_this.newProcess = function(){
		log("Creating new process...");
		var p = new Process(_this.createPID());
		var t = window.setInterval(p.run, SLEEP_TIME);
		p.timer = t;
		RESOURCES.processes.push(p);
	}
	
	// processo esta indo dormir (ficar pausado)
	_this.sleep = function(pid){
		log("Process " + pid + " going sleep...");
		var p = _this.getProcessByPID(pid).process;
		if (p) {
			if (p.timer) {
				window.clearInterval(p.timer);
				p.timer = null;
			} else {
				throw new Error("Warning: Process " + pid + " are already sleeping.");				
			}
		} else {
			throw new Error("Error: Process " + pid + " not found.");
		}		
	}

	// processo acorda
	_this.wake = function(pid){
		log("Process " + pid + " waking up...");
		var p = _this.getProcessByPID(pid).process;
		if (p) {
			if (p.timer) {
				throw new Error("Warning: Process " + pid + " are not sleeping.");				
			} else {
				p.timer = window.setInterval(p.run, SLEEP_TIME);				
			}
		} else {
			throw new Error("Error: Process " + pid + " not found.");
		}
	}
	
	// mata processo
	_this.kill = function(pid){
		var r = _this.getProcessByPID(pid);
		if (r.process) {
			window.clearInterval(r.process.timer);
			RESOURCES.processes.remove(r.index);
		} else {
			throw new Error("Error: Process " + pid + " not found.");
		}
		log("Process " + pid + " is killed!");
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

// TODO: tirar isso
function n(){API.cpu.newProcess();}
function k(p){API.cpu.kill(p);}
function w(p){API.cpu.wake(p);}
function s(p){API.cpu.sleep(p);}

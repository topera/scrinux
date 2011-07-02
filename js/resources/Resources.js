function Resources(disk, processes, memory){
	
	var _this = this;
	_this.class = "Resources";
	
	_this.disk = disk;
	_this.processes = processes;
	_this.memory = memory;
	
	_this.serialize = function (){
		_this.disk.serialize();
		//_this.processes.serialize();
		//_this.memory.serialize();		
	}
	
	_this.unserialize = function (){
		_this.disk = API.cast.File(_this.disk);
		_this.disk.unserialize();
		//_this.processes.unserialize();
		//_this.memory.unserialize();
	}		

}

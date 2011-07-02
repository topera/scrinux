function File(name, type, parentPath){
	
	var _this = this;
	_this.class = "File";
	
	// main
	_this.name			= name;
	_this.type			= type; // D: directory, F: file
	_this.content		= "";
	_this.parentPath	= parentPath;
	_this.children		= [];
	
	// other
	_this.user = USERNAME; // TODO: ainda é monousuario
	_this.group = USERNAME; // TODO: ainda é monousuario
	_this.size = 0; // TODO: calc
	_this.lastUpdate;
	_this.permissions; // TODO
	
	_this.updateMetadata = function(){
		_this.calcPermissions();
		_this.calcSize();
		_this.calcLastUpdate();		
	}
	
	_this.write = function(content){
		if (API.DB.free() >= content.length) {
			_this.content = content;
			_this.updateMetadata();
		} else {
			console.log()
			return "Error: Disk is full";
		}
	}

	_this.calcLastUpdate = function(){
		_this.lastUpdate = new Date();		
	}	
	
	_this.calcSize = function(){
		if (_this.type == "D") {
			_this.size = new Number(255);// TODO: deschumbar 
		} else {
			_this.size = new Number(_this.content.length);
		}
	}
	
	_this.calcPermissions = function(){
		var type = _this.type == "D" ? "d" : "-";
		_this.permissions = type + "rwx------ "
	}
	
	_this.updateMetadata();	
	
	_this.serialize = function (){
		// troca dates pelo timestamp
		_this.lastUpdate = _this.lastUpdate.serialize();
		// serializa filhos
		$(_this.children).each(function(i, it){
			it.serialize();
		});
	}
	
	_this.unserialize = function (){
		// desserializa filhos
		$(_this.children).each(function(i, it){
			it.unserialize();
		});
		// volta data
		_this.lastUpdate = API.cast.Date(_this.lastUpdate);
	}	
	
}


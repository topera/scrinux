function Loader(){
	
	var _this = this;
	
	this.init = function(){
		log("Initializing Loader...");
		
		// pegando configuracao deste usuario
		_this.download("db/" + USERNAME + "/config.js", function(){
			
			// pegando pacotes do core
			$(API.pkgsCore).each(function(i, it){
				debug("+ Loading core package " + it + "");
				_this.downloadPkg("core." + it);
			});
			
			// pegando pacotes custom
			$(API.pkgsCustom).each(function(i, it){
				debug("+ Loading custom package " + it + "");
				_this.downloadPkg("custom." + it);
			});		

			// recarrega dados gravados no cliente
			API.DB.load();
			
			// executa macro inicial
			_this.download("db/" + USERNAME + "/bootstrap.js");
			
			API.fileSystem.enterRootFolder();
			
			// fim
			log("Boot finished.");
			
			
			
		});
	};
	
	this.downloadPkg = function(name) {
		_this.download("pkg/" + name.replace(".", "/") + ".js");
		
	}
	
	this.download = function(name, callback) {
		// TODO: cachear ajaxs dos comandos se for install
		var url = "js/" + name;
		$.getScript(url, callback);
	}
	
	this.install = function(name, closure) {
		debug("Instalando pacote " + name + "...");
		API.pkgs[name] = closure;
	}
	
}
API.loader = new Loader();




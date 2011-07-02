function FileSystem(){
	
	var _this = this;
	_this.current; // TODO: remover duplicacao
	
	/**
	 * Cria um arquivo
	 */
	this.newFile = function(filename){
		var error = _this.isValid(filename, "F");
		if (!error) {
			var f = new File(filename, "F", _this.pwd());
			_this.current.children.push(f);
			API.DB.flush();			
		}
		return error;
	}

	/**
	 * Cria um diretorio
	 */
	this.newFolder = function(filename){
		var error = _this.isValid(filename, "D");
		if (!error) {
			var f = new File(filename, "D", _this.pwd());
			_this.current.children.push(f);
			API.DB.flush();			
		}
		return error;
	}

	/**
	 * Apaga um arquivo
	 */
	// TODO: fazer isso so apagar files
	this.remove = function(filename){
		var error = _this.isValid(filename, "F", true);
		if (!error) {
			_remove(filename);
		}
		return error;
	}
	
	/**
	 * Apaga um diretorio
	 */
	// TODO: fazer isso so apagar dirs
	this.removeDir = function(filename){
		var error = _this.isValid(filename, "D", true);
		if (!error) {
			_remove(filename);			
		}
		return error;
	}	
		
	
	/**
	 * Verifica se pode criar o arquivo ou diretorio
	 */
	this.isValid = function(filename, type, mustExists){
		if (!filename) {
			if (type == "F") {
				return "Error: filename must be specified."
			} else if (type == "D")  {
				return "Error: directory name must be specified."
			}
		} else if (_this.list().length > 0 && _this.isExists(filename, _this.list())) {
			return mustExists ? null : "Error: name already exists.";
		} else {
			return mustExists ? "Error: File/Directory not found." : null;
		}
	}
	
	/**
	 * Verifica se o arquivo/diretorio ja existe
	 */
	this.isExists = function(filename, list){
		if (filename == ".." || filename == ".") return true;
		
		var result = false;
		// TODO:otimizar com break, se achar
		$(list).each(function(i, it){
			if (it.name == filename) {
				result = true;
				return false;// breaks
			}
		});
		return result;
	}	

	/**
	 * Retorna os arqs/dirs desta pasta
	 */
	this.list = function(){
		// var r = $.merge([".", ".."], _this.current.children); TODO: exibir os "." e ".."
		var r = _this.current.children;
		return r;		
	}
	
	/**
	 * mostra a localizacao atual
	 * TODO: metodo gambeta
	 */
	this.pwd = function(){
		if (!_this.current) return "/";
		var r = ""
		var lastNode = _this.current.name;
		var pointer = this.getFileByPath(_this.current.parentPath); 
		while (pointer != null && !(pointer.name == "/" && pointer.parentPath == "/")) {
			r = pointer.name + "/" + r;
			pointer = this.getFileByPath(pointer.parentPath);
		}
		if (r == "") r = "/";
		r += lastNode;
		//return r;
		//return r.replace(/\/$/,"").replace(/\/{2,}/g,"/");
		if (r.indexOf("/") !== 0) r = "/" + r;  
		return r.replace(/\/{2,}/g,"/");		
	}
	
	/**
	 * encontra file pelo path
	 */
	this.getFileByPath = function(path){
		if (!path) return null;
		var bkp = _this.current;
		this.cd(path, true);
		var result = _this.current;
		_this.current = bkp;
		return result;
	}
	
	/**
	 * muda a localizacao atual (percorre caminho)
	 */
	this.cd = function(path, skipAbsolute){
		//se nao for caminho absoluto, o monta
		if (path && path.indexOf("/") !== 0 && !skipAbsolute) {
			var absolut;
			absolut = (_this.pwd() + "/" + path).replace(/^\/\//, "/");				
			debug("Transformando caminho relativo (" + path + ") em absoluto (" + absolut  + ")");
			path = absolut;
		}
		debug("Tentando mudar para diretorio: " + path);

		var bkpPwd = _this.current;
		var split = path.split("/")
		var error = null;
		$(split).each(function(i, it){
			if (it == "") {
				// se esta na primeira posicao e for barra, entao é a raiz
				if (i == 0) {
					it = "/";//RESOURCES.disk;
					_this.enterRootFolder();
				} else {
					return false; //break
				}
			}
			
			// se ja estiver na raiz e tentar subir ou ficar la, nao faz nada
			if ((it == ".." || it == ".") && _this.current.name == "/") {
				return false;
			}
			
			error = _cd(it);
			if (error) {
				return false; // break
			}
		});
		
		// se houver algum erro, volta pra pasta que tava
		if (error) {
			_changeCurrent(bkpPwd);
		}
		return error;
	}
	
	/**
	 * grava dados em arquivo
	 */
	this.write = function(filename, content){
		if (_this.isExists(filename, _this.list())){
			var file = _getChildByName(filename);
			var error = file.write(content);
			if (error) {
				return error;
			}
			API.DB.flush();			
		} else {
			return "Error: File " + filename +" not found.";
		}
		
	}	
	
	/**
	 * le dados do arquivo
	 */
	this.read = function(filename, content){
		if (_this.isExists(filename, _this.list())){
			var file = _getChildByName(filename);
			return file.content; 
		} else {
			return "Error: File " + filename +" not found.";
		}	
	}	
	
	_this.enterRootFolder = function(){
		_this.current = RESOURCES.disk;
	}

	/* PRIVATE */

	/*
	 * muda a localizacao, pasta a pasta
	 */
	_cd = function(filename) {
		debug("Vendo se " + filename + " existe na lista " + _this.list());
		
		if (filename == "/") {
			_this.enterRootFolder();
			return null;
		}
		
		if (_this.isExists(filename, _this.list())) {
			if(_isCanEnter(filename)) {
				var file;
				if (filename == "..") {
					file = _this.getFileByPath(_this.current.parentPath);
				} else if (filename == ".") {
					file = _this.current;					
				} else {
					file = _getChildByName(filename);					
				}
				_enterFolder(file);
			} else {
				return filename + " isn't a valid directory";
			}
		} else {
			return "cd: " + filename + ": file ou directory not found"
		}			
	}

	_isCanEnter = function(filename){
		// TODO: tirar gambeta do filename
		return filename == "." || filename == ".." || (_getChildByName(filename).type == "D");
	}
	
	_getChildByName = function(filename){
		var r = null
		$(_this.current.children).each(function(i, it){
			if (it.name == filename) {
				r = it;
			}
		});
		return r;
	}
	
	_enterFolder = function(file){
		debug("Entrando na pasta " + file);
		_changeCurrent(file);
	}
	
	_changeCurrent = function(file){
		_this.current = file;		
	}
	
	_remove = function(filename) {
		var index = null
		$(_this.current.children).each(function(i, it){
			if (it.name == filename) {
				index = i;
				return false;
			}
		});
		if (index !== null) {
			_this.current.children.remove(index);
		} else {
			throw new Error("Error deleting file " + filename);
		}
		API.DB.flush();			
	}
	
}
API.fileSystem = new FileSystem();


function Api(){
	var _this = this;
	
	this.install = function(txt, closure){
		_this.loader.install(txt, closure);	
	}	
	
}
var API = new Api();
API.pkgs = [];
API.pkgsCore; // populado com dados do server 
API.pkgsCustom;// populado com dados do server

$(document).ready(function(){
	API.boot.init();
});
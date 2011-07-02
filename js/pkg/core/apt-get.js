API.install('apt-get', function (txt){
	var tmp = getParams(txt);
	var command = tmp[0];
	var params = tmp[1];		
	switch (command) {
		case "update":	return update(params); break;	
		case "install":	return install(params); break;	
		case "help":	return help(); break;
		default:		return help(); break;
	}

	// END
	
	// help
	function help() {
		var r = "";		
		r += "\napt 0.0.1 para scrinux";
		r += "\n";	
		r += "\nUso: apt-get comando";
		r += "\napt-get install pacote1 [pacote2 ...]";
		r += "\napt-get remove pacote1 [pacote2 ...]";
		r += "\n";	
		r += "\napt-get é uma simples interface de linha de comando para baixar e instalar pacotes. Os pacotes são inicialmente baixados para o browser ficando em cache. Além disso suas configurações pessoais no servidor marcam que você tem este pacote. Assim, no próximo login os novos pacotes já serão baixados automaticamente";
		r += "\n";	
		r += "\nComandos:";
		r += "\ninstall - Instala novos pacotes";
		r += "\nupgrade - Efetua uma atualização";
		r += "\nremove - Remove os pacotes";
		r += "\nhelp - Exibe esta tela";	
		return r;		
	}
	
	// install
	function install(params) {
		var r = "";		
		r += "\nInstalando " + params;
		API.loader.downloadPkg("custom." + params);
		return r;		
	}
	
	// update
	// TODO: o update nao ta funfando pro proprio apt-get
	function update(params) {
		var r = "";		
		if (params) {
			r += "\nAtualizando " + params;
			API.loader.downloadPkg("custom." + params);
		} else {
			r = "Erro. Faltou indicar o nome do pacote.";
		}
		return r;		
	}
	
});

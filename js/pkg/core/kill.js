API.install('kill', function (param){
	var r = "";
	r = API.cpu.kill(param);
	return r;
});

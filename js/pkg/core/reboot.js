API.install('reboot', function (){
	var r = "Rebooting now...";
	API.boot.reboot();	
	return r;
});

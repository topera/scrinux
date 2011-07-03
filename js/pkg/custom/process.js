API.install('process', function (p){
	switch(p) {
		case "1":
			API.cpu.newProcess("process", function(){
				
			});
		break;
		default:
			API.cpu.newProcess("process", function(){
				console.log("A process created just to test!");
			});
	}
});


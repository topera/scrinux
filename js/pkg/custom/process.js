API.install('process', function (p){
	switch(p) {
		case "1":
			API.cpu.newProcess("process", eternal);
		break;
		default:
			API.cpu.newProcess("process", function(){
				console.log("A process created just to test!");
			});
	}
});


function eternal(){
	console.log("A second process... eternal...");
	console.log("...dot man!! i'm running");
	window.setTimeout(eternal, 200)
}
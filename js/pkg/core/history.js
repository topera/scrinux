API.install('history', function (){
	var r = "";
	$(API.console.history).each(function(i, it){
		r += "\n" + (i + 1) + " " + it;		
	}); 
	return r;
});


/*function teste(){
	
	var n = 1;
	search: while (true) {
	  n += 1;
	  for (var i = 2; i <= Math.sqrt(n); i += 1) {
		  if (n % i == 0) {
			  continue search;
		  }
	  }
	  // found a prime!
	  postMessage(n);
	}	
	
	
}
*/

//function teste(){}
//var s = Base64.encode(teste.toString());
/*
var s = Base64.encode("function teste(){while(1){}}");
var url1 = "data:text/javascript;base64," + s;


console.log(url1);
var worker1 = new Worker(url1);
*/

var url2 = "data:text/javascript;base64,ZnVuY3Rpb24gdGVzdGUoKXt9";
console.log(url2);
var worker2 = new Worker(url2);

/*
worker.onmessage = function (event) {
	RESOURCES.last = event.data
};



*/
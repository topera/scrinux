API.install('hello', function (size){
	size *= 1024;
	var r = "HelloWorld Generator!";
	r = "\nCreating a Hello With " + size + " bytes...";
	var fs = API.fileSystem;
	fs.newFile("hello" + size + ".txt");
	var content = "";
	var i = 0;
	if (size) {
		while(i<size) {
			content += "x";
			i++;			
		}
	}
	var error = fs.write("hello" + size + ".txt", content);
	return error ? error : r;
});

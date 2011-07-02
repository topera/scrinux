API.install('cat', function (txt){
	return API.fileSystem.read(txt);
});

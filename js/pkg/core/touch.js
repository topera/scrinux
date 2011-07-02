API.install('touch', function (filename){
	return API.fileSystem.newFile(filename);
});

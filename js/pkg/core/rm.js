API.install('rm', function (filename){
	return API.fileSystem.remove(filename);
});

API.install('ls', function (param){
	var r = "";
	$(API.fileSystem.list()).each(function(i, it){
		if (!param) {
			r += it.name + "  ";
		} else if (param == "-l") {
			if (it.toString().indexOf(".") != 0) {
				r += it.permissions + " " + it.user + " " + it.group + " "
				r += sprintf("%8s", it.size.human()) + " " + it.lastUpdate.human() + " " + it.name + "\n";
			}
		}
		// TODO: fazer para "-la" para ver ocultos
	});
	return r;
});

API.install('df', function (param){
	var total = API.DB.total();
	var used = API.DB.usage();
	var free = API.DB.free();
	var percent = API.DB.usagePercent();
	var r = "";
	r += "Filesystem\tSize\tUse\tFree\t%";
	r += "\n/localStorage\t" + total.human() + "\t" + used.human() +"\t" + free.human() + "\t" + percent + "%";
	return r;
});

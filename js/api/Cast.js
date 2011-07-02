function Cast() {

	var _this = this;
	
	/*
	 * File
	 */
	_this.File = function(data){
		if (!data) {
			return null;
		}
		if (data instanceof File) {
			return data;
		}
		
		var file			= new File();
		file.name			= data.name;
		file.type			= data.type;
		file.content		= data.content;
		file.parentPath		= data.parentPath;		
		
		file.children		= [];
		$(data.children).each(function(i, it){
			file.children.push(API.cast.File(it));			
		});
		
		file.user			= data.user;
		file.group			= data.group;
		file.size			= data.size;
		file.lastUpdate		= data.lastUpdate;
		file.permissions	= data.permissions;
		return file;
	}
	
	/*
	 * Date
	 */
	_this.Date = function(data){
		return new Date(data);
	}
	
	/*
	 * Resources
	 */
	_this.Resources = function(data){
		return new Resources(data.disk, data.processes, data.memory);
	}
	
	
}
API.cast = new Cast();
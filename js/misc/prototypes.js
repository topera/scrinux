// Number
Number.prototype.human = function(){
	if (this < 1024) {
		return this;
	} else if (this < 1048576) {
		return Math.round((this/1024) * 10) / 10 + "K";
	} else {
		return Math.round((this/1024/1024) * 10) / 10 + "M";		
	}
}

// Date
Date.prototype.human = function(){
	var year = sprintf("%04d", this.getFullYear());
	var month = sprintf("%02d", this.getMonth());
	var day = sprintf("%02d", this.getDate());
	var hours = sprintf("%02d", this.getHours());
	var minutes = sprintf("%02d", this.getMinutes());
	return year + "-" + month + "-" + day + " " + hours + ":" + minutes; 
}

Date.prototype.serialize = function(){
	return this.getTime();
}

Date.prototype.unserialize = function(){
	return new Date(this);
}

Date.prototype.elapsedTime = function(){
	var d = new Date() - this;
	var seconds = sprintf("%02d", Math.floor(d / 1000) % 60);	
	var minutes = sprintf("%02d", Math.floor(d / 1000 / 60) % 60);
	var hours = sprintf("%02d", Math.floor(d / 1000 / 60 / 60) % 24);
	return d = hours + ":" + minutes + ":" + seconds;
}

Date.prototype.clock = function(){
	var d = new Date();
	var seconds = sprintf("%02d", d.getSeconds());	
	var minutes = sprintf("%02d", d.getMinutes());
	var hours = sprintf("%02d", d.getHours());
	return d = hours + ":" + minutes + ":" + seconds;
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// JSON
JSON.stringifyCustom = function(object) {
	if (object.serialize) {
		object.serialize();
	}
	var string = JSON.stringify(object);
	
	// volta ao estado inicial, para nao precisarmos clonar o objeto
	if (object.unserialize) {
		object.unserialize();
	}
	
	return string;
}


JSON.parseCustom = function(string) {
	var object = JSON.parse(string);
	if (!object) return null;
	
	// realiza cast para objeto principal
	if (object.class == "Resources") {
		var resources = API.cast.Resources(object);
		resources.unserialize();
		return resources;
	}
	
	return object;
}


// TODO: improving this...it's awful!
function Console(){
	
	var _this = this;
	this._c = null;
	this.history = [];
	this.historyPos = -2; 
	
	this.init = function(){
		log("Starting console");
		_this.events();
		$("#console").html("<div class='console'></div>");
	}
	
	this.destroy = function(){
		$("#console").html("");
	}
	
	this.events = function(){
		trace("Console events.");
		
		$(".console").live("click", function(){
			$(".caret").focus();			
		});
		
		$(".caret").live("keydown", function(e){
			var txt = $(this).val();
			
			// enter
			if (e.keyCode == 13) {
				_this.historyPos = -2;
				_this.history.push(txt);
				//_this.outbr("Command not found.");
				var r = API.system.run(txt);
				_this.outbr(r);
				_this.updateCaret(txt);
			}
			// tab
			else if (e.keyCode == 9) {
				e.preventDefault();				
				_this.showTip(txt);
			}
			// up 
			else if (e.keyCode == 38) {
				_this.updateHistory("up");
			}
			// down
			else if (e.keyCode == 40) {
				_this.updateHistory("down");				
			}
			
		});
	};
	
	this.updateHistory  = function(mode){
		if (_this.historyPos == -2) {
			_this.historyPos = _this.history.length - 1;			
		} else if (mode == "up") {
			_this.historyPos--;
		} else {
			_this.historyPos++;
		}
		if (_this.historyPos < 0) {
			_this.historyPos = 0;
		} else if (_this.historyPos == _this.history.length) {
			_this.historyPos = _this.history.length - 1;
		}
		$(".caret").val(_this.history[_this.historyPos]);
	};
	
	/**
	 * refaz caret, para receber novos comandos
	 */
	this.updateCaret = function(antes, depois){
		//_this.c().html(_this.c().html() + "<div class='caretBlink'>█</div><input type='text' class='caret' />");
		$(".caret").replaceWith("<span class='lastCommand'>" + antes + "</span>");		
		_this.outbr("");
		_this.outbr(USERNAME + ":" + API.fileSystem.pwd() + "$");
		_this.out("<input type='text' class='caret' />");
		$(".console").scrollTop(999999);	
		$(".caret").focus().val(depois);		
	};	

	this.showTip = function(txt){
		var result = [];
		var commands = [];
		$.merge(commands, API.pkgsCore);
		$.merge(commands, API.pkgsCustom);
		$(commands).each(function(i, it){
			// se inicio do comando eh igual
			if (it.indexOf($.trim(txt)) === 0) {
				result.push(it);
			}
		});
		
		// TODO: ordenar resultados

		// se tiver so 1, já mostra.
		// se for mais de um, exibe no console
		if (result.length > 1) {
			var str = ""
			$(result).each(function(i, it){
				str += it + " ";
			});
			// TODO: limitar horizontalmente
			_this.outbr(str);
			_this.updateCaret(txt, txt);
		} else if  (result.length == 1) {
			$(".caret").val(result[0] + " ");				
		}
	};	
	
	this.outbr = function(txt){
		if (!txt) txt = "&nbsp;";
		txt = txt.replace(/(.{80})/g, "$1\n");
		_this.c().html(_this.c().html() + "<pre><span>" + txt + "</span></pre>");
	};
	
	this.out = function(txt){
		if (txt == "") txt = "&nbsp;";
		_this.c().html(_this.c().html() + txt);
	};

	this.c = function(){
		if (!_this._c) {
			_this._c = $(".console");
		}
		return _this._c;
	};
	
}
API.console = new Console();


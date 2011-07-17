function Gnome() {

	var _this = this;

	/*
	 * Start
	 */
	_this.start = function(){
		// TODO: use objects to do this
		// desktop
		$("body").addClass("gnomed").attr("id", "gnomed").append("<div id='desktop'></div>");
		_this.updateWallpaper("default.png");
		
		// panel
		$("#desktop").append("<div class='panel'></div>");
		
		// button app
		$(".panel").append('<div class="buttonWrapper"><input type="checkbox" class="button applications-btn" id="applications-btn" /><label for="applications-btn">Applications</label></div>');
		$(".applications-btn").button({icons: {primary: "icon-start"}});
		$(".applications-btn").click(function(){
			$("#console").dialog({resizable: false, width: 646});
		});				
		
		// button about
		$(".panel").append("<div class='button about-btn'>About</div>");
		$(".about-btn").button();
		$(".about-btn").click(function(){
			var content = $("#about").html();
			content = content.replace(/\$version/g, VERSION).replace(/\$lastUpdate/g, LAST_UPDATE);
			$("#about").html(content);
			$("#about").dialog({resizable: false});
		});		
		
		// faq about
		$(".panel").append("<div class='button faq-btn'>FAQ</div>");
		$(".faq-btn").button();
		$(".faq-btn").click(function(){
			$("#main .i18ntoolbox").show();
			$("#main").dialog({minWidth: 800, height: 500});
		});		
		
		// clock app
		$(".panel").append("<div class='button clock-btn right-btn'></div>");
		window.setInterval(function(){
			$(".clock-btn").html("<span class='ui-button-text'>" + new Date().clock() + "</span>");
		}, 1000);
		$(".clock-btn").button();
		
	}
	/*
	 * Start
	 */
	_this.updateWallpaper = function(file){
		$("#desktop").css("background-image", "url('./img/" + file + "')");
	}
	
}
API.gnome = new Gnome();
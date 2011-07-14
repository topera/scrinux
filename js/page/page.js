$(function(){
	PAGE.setLanguage("en");
	$("[data-set-lang]").click(function(){
		PAGE.setLanguage($(this).data("set-lang"));
	});
});

function Page(){
	this.setLanguage = function(lang){
		$("[data-language]").hide();
		$("[data-language=" + lang + "]").show();
	}
}
var PAGE = new Page();
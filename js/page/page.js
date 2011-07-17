$(function(){
	PAGE.setLanguage("en");
	$("[data-set-lang]").live("click", function(){
		PAGE.setLanguage($(this).data("set-lang"));
	});

	// FAQ
	$("#main a").attr("target", "_blank").attr("title", "This link will open a new window");	
	$(".topics > li > em").toggle(function(){
		$(this).parents("li:eq(0)").find(".subtopics").show();
	}, function(){
		$(this).parents("li:eq(0)").find(".subtopics").hide();
	});
	
});

function Page(){
	this.setLanguage = function(lang){
		$("[data-language]").hide();
		$("[data-language=" + lang + "]").show();
	}
}
var PAGE = new Page();
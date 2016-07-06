$("#search_input").bind('keyup',function()
{
	$("#search-suggest").show().css({
		top:$('#search-form').offset().top+$("#search-form").height(),
		left:$('#search-form').offset().left,
		position:"absolute",
	});

})
$("#search_input").bind('keyup',function()
{
	var searchText = $("search_input").val();//获取searchText内容
	$("#search-suggest").show().css({
		top:$('#search-form').offset().top+$("#search-form").height(),
		left:$('#search-form').offset().left,
		position:"absolute",
	});

})


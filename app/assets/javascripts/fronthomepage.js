$(function(){
	$("#playBtn").click(function(e){
		
		$(this).hide();
		var myPlayer = videojs("my_video_1");
		myPlayer.play();
		$("#my_video_1").show();
	});

	$("#moreKeyword").click(function(e){
		
	});

	$("#moreKeyword").bind("click", onMoreClick);

	function onMoreClick(e)
	{
		$(".moreKw").show();
		$("#functionList").height("148px");
		$("#moreKeyword").text("精简");
		$("#moreKeyword").unbind("click", onMoreClick);
		$("#moreKeyword").bind("click", onLessClick);
		e.preventDefault();
	}

	function onLessClick(e)
	{
		
		$(".moreKw").hide();
		$("#functionList").height("48px");
		$("#moreKeyword").text("查看更多");
		$("#moreKeyword").unbind("click", onLessClick);
		$("#moreKeyword").bind("click", onMoreClick);
		e.preventDefault();
	}
});
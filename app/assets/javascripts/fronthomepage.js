$(function(){
	$("#playBtn").click(function(e){
		
		$(this).hide();
		var myPlayer = videojs("my_video_1");
		myPlayer.play();
		$("#my_video_1").show();
	});
});
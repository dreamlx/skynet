define(["jquery"],function($){

	var _float, _triggers;
	var config = {

		floatId:"#floatTableOperateDiv",
		triggerClass:".tableOperate",
	};
	var init = function(){
		$(document).bind("listDataCompleted", function(evt){
			bindMouseEvt();
		});
	};

	function bindMouseEvt()
	{
		_float = $(config.floatId);
		_triggers = $(config.triggerClass);

		_float.mouseleave(function(e){
			$(this).hide();
		});

		_triggers.mouseover(function(e){
			_float.show();
			_float.attr("data-id", $(this).attr("data-id"));
			var top = $(this).position().top + $(this).height()+20;
			var left = $(this).position().left - _float.width() + 42;
			_float.css("top", top).css("left", left);
		});		

		_float.find("li").click(function(e){
			var act = $(this).attr("id");
			var id = _float.attr("data-id");
			console.log("act is "+act+", id is "+id);
			$(document).trigger("queryArticleAct", [act,[id]]);
		});
	}
	return {
		init:init
	};
});
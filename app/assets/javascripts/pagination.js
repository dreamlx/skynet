define(['jquery'],function($){

	var _mainDivs;
	var _float;
	var _triggers;
	var _data;
	var config = {
		triggerId:"a.next10PageBtn"
	};

	var set = function(dom, pageFloat, data)
	{
		_mainDivs = $(dom);
		_float = $(pageFloat);
		_float.mouseleave(function(e){
			console.log("leave!!")
			$(this).hide();
		});
		_triggers = _mainDivs.find(config.triggerId);
		// console.log("left : "+_triggers.position().left);
		main();
		//console.log($(dom).width());
	};

	function main()
	{
		initFloatSelector();
		bindEvt();
	};

	function initFloatSelector()
	{
		// _float.hide();
	};

	function bindEvt()
	{
		if(_triggers)
		{
			_triggers.mouseenter(function(e){

				_float.show();

				var position = $(this).position();
				var left = position.left - (_float.width()/2 - 12);
				var top = position.top - _float.height();

				_float.css("top", top).css("left", left);

				
			});
			
		}
	};

	return {
		set: set

	};
});
define(['jquery', 'filterModel'],function($, model){

	var _mainDivs;
	var _float;
	var _triggers;
	var _data;
	var config = {
		triggerId : "a.next10PageBtn",
		mainDivWarpperId : ".tablePaginationBlock", 
		floatPageWarpperId : ".floatPageSelector",
		pageLiDom : "<li class='create'><a href=''></a></li>"
	};

	var init = function()
	{
		_mainDivs = $(config.mainDivWarpperId);
		_float = $(config.floatPageWarpperId);
		_float.mouseleave(function(e){
			$(this).hide();
		});

		_triggers = _mainDivs.find(config.triggerId);
		bindShowFloatEvt();

		$(document).bind("listDataCompleted", function(evt){
			if( _mainDivs.find(".create").length > 0 )
			{
				clearPageList();
			};
			buildPageList();
		});
	};

	function buildPageList()
	{
		var total = model.totalPages;
		var cur = model.currentPage;
		_mainDivs.find("span em").text(model.totalArticle);
		_mainDivs.find("span b").text(total);
		var pageArrLen = total > 10 ? 10 : total;
		if(cur > 10 && (total % 10) > 0)
		{
			pageArrLen = total % 10;
		}
		var pageArr = [];
		for (var i = pageArrLen; i > 0 ; i--) {
			var li = $(config.pageLiDom);
			li.find("a").attr("href", "#querypage="+i).text(i).click(function(e){
				// console.log(this.hash);
				$(document).trigger("queryfilter", [this.hash]);
			});
			if(i == cur)
			{
				li.find("a").addClass("selected");
			}

			_mainDivs.find("ul li:first-child").after(li);
		};
		initFloatSelector();
	}

	function clearPageList()
	{
		$(".create").remove();
	}


	function initFloatSelector()
	{
		// _float.hide();
	};

	function bindShowFloatEvt()
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
		init: init

	};
});
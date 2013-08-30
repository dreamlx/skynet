define(["jquery","filterModel"], function($, model){

	var config = 
	{
		mainDivId : "#tableFilterBlock",
		searchFormId : "#searchForm",
		searchInputId : "#searchKeywordInput",
		searchConditionId : "#searchCondition"
	}


	function init()
	{
		$(config.mainDivId+" ul a").click(function(e){
			$(document).trigger("queryfilter", [this.hash])
			e.preventDefault();
		});

		$(document).bind("listDataCompleted", function(){
			var order = model.filterParam.orderby;
			if(order == undefined || order.length == 0)
			{
				order = "acttime_down";
			}
			$(config.mainDivId).find("a").removeClass("selected");
			$(config.mainDivId).find("."+order).addClass("selected");
		});

		$(config.searchFormId).submit(function(e){
			e.preventDefault();
			return
		});

		$(config.searchInputId).keypress(function(e){
			if(e.which == 13){
				model.filterParam.searchtype = $(config.searchConditionId).val();
				model.filterParam.searchkeyword = $(config.searchInputId).val();
				model.queryListByFilter();
				e.preventDefault();
				model.filterParam.searchtype = 0;
				model.filterParam.searchkeyword = "";
			}
		});
	}

	return {

		init : init
	}
});
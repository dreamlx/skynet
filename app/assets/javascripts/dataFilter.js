define(["jquery", "filterModel"],function($, model){
	var _all_article_kinds, _all_article_filters;

	var _liArr={};

	var config = {
		mainDiv : "#brandTitleBlock",
		conditionListId : "#conditionList",
		selectedListWarpperId : "#selectedCondition ul", 
		clearConditionBtnId : "#clearConditionBtn",
		filterDiv: "#filterConditionBlock",
		statusListWarpperId : "#statusList",
		mediaTypeListWarpperId : "#mediaTypeList",
		dateListWarpperId : "#dateList",
		isGoodListWarpperId : "#isGoodList",
		slideUpBtnId : "#slideUpBtn"
	}


	var init = function()
	{
		$.get("/home/articleParams.json",function(data){
			// console.info(data);
			if(data.article_kinds.error)
			{
				console.error(data.article_kinds.error);
				return
			}
			_all_article_filters = data.article_filters.data;
			_all_article_kinds = data.article_kinds.kinds;

			setupKinds();
			setupFilterList();

			setDefaultSelected();
		});

		$(config.clearConditionBtnId).click(function(e){
			model.setDefault();
			model.queryListByFilter();	
			e.preventDefault();
		});

		$(document).bind("listDataCompleted", function(){
			updateFilterSelectedStatus();
		});

		$(config.slideUpBtnId).click(function(e){
			$(config.filterDiv).slideToggle();
			if($(this).hasClass("slideDown"))
			{
				$(this).removeClass("slideDown");
				$(this).find('a').text("收起");
			}else
			{
				$(this).addClass("slideDown");
				$(this).find("a").text("展开");

			}
			e.preventDefault();
		});
	}

	

	function findSelectedLi(warpper, selectedValue){
		$(warpper).find("li").each(function(index){
			if($(this).attr("value") == selectedValue)
			{
				$(this).find("a").addClass("selected");
			}
		});
	};

	function setupKinds()
	{
		var ul = $(config.mainDiv+" ul");
		for (var i = 0,len = _all_article_kinds.length; i < len; i++) {
			// console.log(_all_article_kinds[i]);
			var obj = _all_article_kinds[i];
			var id = obj.id;
			var name = obj.name;
			var liDom = $("<li><a href='#qkind="+id+"'>"+name+"</a></li>");
			ul.append(liDom);
			_liArr.id = liDom;
		};
	};

	function setupFilterList()
	{
		var statusArr = _all_article_filters.status;
		var mediaTypeArr = _all_article_filters.media_kind;
		var dateArr = _all_article_filters.date;
		var isGoodArr = _all_article_filters.dx;

		buildFilterList("status", statusArr, $(config.statusListWarpperId));
		buildFilterList("mediaType", mediaTypeArr, $(config.mediaTypeListWarpperId));
		buildFilterList("date", dateArr, $(config.dateListWarpperId));
		buildFilterList("isGood", isGoodArr, $(config.isGoodListWarpperId));
	};

	function buildFilterList(filterType, arr, warpper)
	{
		for(var i=0, len=arr.length; i<len; i++){
			var obj = arr[i];
			var id = obj.value, name = obj.name;
			var liDom = $("<li value='"+id+"'><a href='#q"+filterType+"="+id+"'>"+name+"</a></li>");
			liDom.find("a").click(function(e){
				$(document).trigger("queryfilter", [this.hash]);
			});
			warpper.append(liDom);
		}
	};

	function setDefaultSelected()
	{
		var defaults = model.defaultFilterParams;
		if(_liArr[defaults.id_kind])
		{
			_liArr[defaults.id_kind].find("a").addClass("selected");
		}

		findSelectedLi(config.statusListWarpperId, defaults.state);
		findSelectedLi(config.mediaTypeListWarpperId, defaults.sourcetype);
		findSelectedLi(config.dateListWarpperId, defaults.day_count);
		findSelectedLi(config.isGoodListWarpperId, defaults.isgood);

		insertSeletedCondition(_all_article_filters.status, defaults.state, "状态");
		insertSeletedCondition(_all_article_filters.media_kind, defaults.sourcetype, "类型");
		insertSeletedCondition(_all_article_filters.date, defaults.day_count, "");
		insertSeletedCondition(_all_article_filters.dx, defaults.isgood, "调性");
	};

	function insertSeletedCondition(arr, id, word){
		for(var i=0,len=arr.length; i<len;i++)
		{
			if(arr[i].value == id)
			{
				$(config.clearConditionBtnId).before("<li>"+arr[i].name+word+"</li>");
			}
		}
	};

	function updateFilterSelectedStatus()
	{
		var params = model.filterParam;

		$(conditionList).find("a").removeClass("selected");

		findSelectedLi(config.statusListWarpperId, params.state);
		findSelectedLi(config.mediaTypeListWarpperId, params.sourcetype);
		findSelectedLi(config.dateListWarpperId, params.day_count);
		findSelectedLi(config.isGoodListWarpperId, params.isgood);

		$(config.selectedListWarpperId).find("li").each(function(i,li){
			if($(li).attr("id") != "clearConditionBtn")
			{
				li.remove();
			}
		});
		insertSeletedCondition(_all_article_filters.status, params.state, "状态");
		insertSeletedCondition(_all_article_filters.media_kind, params.sourcetype, "类型");
		insertSeletedCondition(_all_article_filters.date, params.day_count, "");
		insertSeletedCondition(_all_article_filters.dx, params.isgood, "调性");

	}

	return {
		init:init,

	}
});
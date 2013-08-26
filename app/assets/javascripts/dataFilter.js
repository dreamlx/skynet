define(["jquery"],function($){
	var _all_article_kinds, _all_article_filters;

	var _liArr={};

	var config = {
		mainDiv : "#brandTitleBlock",
		selectedListId : "#selectedCondition", 
		filterDiv: "#filterConditionBlock",
		statusListWarperId : "#statusList",
		mediaTypeListWarperId : "#mediaTypeList",
		dateListWarperId : "#dateList",
		isGoodListWarperId : "#isGoodList",
		slideUpBtnId : "#slideUpBtn"
	}

	var params = {
		id_kind : -1,		//公司id
		orderby : "",		//排序
		state : 0,			//信息状态
		sourcetype : -1,	//媒介类型mediaType
		isgood:-1,			//调性
		starttime:"",		//自定义开始时间
		endtime:"",			//自定义结束时间
		searchtype:0,		//搜索类型
		searchkeyword:"",	//搜索词
		day_count:30,		//时间
		num:20,				//条数
		from:0				//起始条数
	};

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

	var select = function(id){

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

		buildFilterList("status", statusArr, $(config.statusListWarperId));
		buildFilterList("mediaType", mediaTypeArr, $(config.mediaTypeListWarperId));
		buildFilterList("date", dateArr, $(config.dateListWarperId));
		buildFilterList("isGood", isGoodArr, $(config.isGoodListWarperId));
	};

	function buildFilterList(filterType, arr, warper)
	{
		for(var i=0, len=arr.length; i<len; i++){
			var obj = arr[i];
			var id = obj.value, name = obj.name;
			var liDom = $("<li><a href='#q"+filterType+"="+id+"'>"+name+"</a></li>");
			warper.append(liDom);
		}
	};

	function setDefaultSelected()
	{

	};

	return {
		init:init,
		select:select
	}
});
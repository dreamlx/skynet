define(["jquery", "filterModel"], function($, model){

	bindEvt();
	function bindEvt()
	{
		$(document).bind("queryfilter", function(evt, hash){
			console.log("get a query about filter, the hash is "+hash);
			var queryStr = hash.replace(/#/, "");
			var queryArr = queryStr.split("=");
			var queryType = queryArr[0];
			var queryValue = queryArr[1];

			showLoading();

			switch(queryType)
			{
				case "querypage":
					queryPage(queryValue);
					break;
				case "qstatus":
					queryFilter("state", queryValue);
					break;
				case "qmediaType":
					queryFilter("sourcetype", queryValue);
					break;
				case "qdate":
					queryFilter("day_count", queryValue);
					break;
				case "qisGood":
					queryFilter("isgood", queryValue);
					break;
				case "qkind":
					queryFilter("id_kind", queryValue);
					break;
				case "qorder":
					queryFilter("orderby", queryValue);
					break;
			}
		});

		$(document).bind("queryArticleAct", function(e, act, ids){
			showLoading();

			switch(act)
			{
				case "actionWarning":
					$.get("/home/send_warning.json", "aids="+ids.join(","), function(data){
						console.log(data);
					});
					break;
				case "actionFavorite":
					$.get("/home/add_favorite.json", "aids="+ids.join(","), function(data){
						console.log(data);
					})
					break;
				case "actionSetTop":
					$.get("/home/set_top.json", "aids="+ids.join(",")+"&val=1", function(data){
						console.log(data);
					})
					break;
				case "actionSetHot":
					$.get("/home/set_hot.json", "aids="+ids.join(",")+"&val=1", function(data){
						console.log(data);
					})
					break;
				case "actionGetHitWord":
					$.get("/home/get_hit_word.json", "aids="+ids.join(","), function(data){
						console.log(data);
					})
					break;
				case "actionInfo":
					$.get("/home/add_info.json", "aids="+ids.join(","), function(data){
						console.log(data);
					})
					break;
				case "actionDel":
					$.get("/home/del_article.json", "aids="+ids.join(","), function(data){
						console.log(data);
					})
					break;
			}
		});

		$(document).bind("querybatch", function(e, act, ids){
			showLoading();
			switch(act){
				case "batchExport":
					$.post("/home/excel_article.json", "aid="+ids.join(","), function(data){
						console.log(data);
					});					
					break;
				case "batchPlan":
					$.post("/home/add_plan.json", "aid="+ids.join(","), function(data){
						console.log(data);
					});	
					break;
				case "batchModfiy":
					break;
				case "batchDelete":
					$.post("/home/del_article.json", "aid="+ids.join(","), function(data){
						console.log(data);
					});
					break;
				case "batchReport":
					break;
				case "batchFavorite":
					$.post("/home/add_favorite.json", "aid="+ids.join(","), function(data){
						console.log(data);
					})
					break;
				case "batchWarning":
					$.post("/home/send_warning.json", "aid="+ids.join(","), function(data){
						console.log(data);
					});
					break;
			}
		});

		$(document).bind("listDataCompleted", function(e){
			hideLoading();
		});
	}

	function queryFilter(param, value)
	{
		model.filterParam[param] = value;
		model.filterParam.from = 1;
		model.queryListByFilter();
	}

	function queryPage(page)
	{		
		model.filterParam.from = (page-1)*20+1;
		model.queryListByFilter();
	}

	function showLoading()
	{
		$("html").addClass("overlay-lock");
		$("body").append("<div class='loading-overlay'><div class='loading'></div></div>")
	}

	function hideLoading()
	{
		$("html").removeClass("overlay-lock");
		$(".loading-overlay").remove();
	}


	return {};

});
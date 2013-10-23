define(["jquery", "filterModel"], function($, model){
	

	var config = 
	{
		listWarpperSelector : "#dataTable tbody",
		tr : "<tr></tr>",
		checkTd : "<td><span class='chartIcon'></span><input type='checkbox'></td>",
		indexTd : "<td></td>",
		titleTd : "<td><p class='dataTitle'></p></td>",
		sameNumSpan : "<span class='textNum'></span>",
		dxTd : "<td></td>",
		djTd : "<td></td>",
		commentNumTd : "<td></td>",
		websiteTd : "<td></td>",
		dateTd : "<td class='postTime'></td>",
		operateTd : "<td><a class='tableOperate' href='#'></a></td>",
		dxTitle : {0:"无",1:"正面",2:"负面",3:"中性"},
	}

	var init = function(){
		$(document).bind("listDataCompleted", function(evt){
			if($(config.listWarpperSelector).find("tr").length > 0)
			{
				$(config.listWarpperSelector).find("tr").remove();
			}
			var arr = model.listData;
			var articleIndex = (model.currentPage - 1) * 20 + 1;
			for (var i = arr.length - 1; i >= 0; i--) {
				var article = arr[i];
				buildList(article, articleIndex);
				articleIndex++;
			};
		});
	};

	function buildList(data, index)
	{
		var warpperTr = $(config.tr).attr("data-id",data.id);
		if(index % 2 == 0)
		{
			warpperTr.addClass("evenline");
		}
		var checkTd = $(config.checkTd);
		checkTd.find("input").attr("value",data.id);

		var indexTd = $(config.indexTd).text(index);

		var titleTd = $(config.titleTd);
		titleTd.find(".dataTitle").text(data.content);
		if(data.baobiao_num>1)
		{
			var num = $(config.sameNumSpan).text(data.baobiao_num);
			titleTd.find(".dataTitle").after(num);
		}

		var dxTd = $(config.dxTd).text(config.dxTitle[data.dx]);
		var djTd = $(config.djTd).text(data.click);
		var commentNumTd = $(config.commentNumTd).text(data.reply);
		var websiteTd = $(config.websiteTd).text(data.site);
		var dateTd = $(config.dateTd).text(data.published_at);

		var operateTd = $(config.operateTd);
		operateTd.find(".tableOperate").attr("data-id",data.id);

		warpperTr.append(checkTd).append(indexTd).append(titleTd).append(dxTd);
		warpperTr.append(djTd).append(commentNumTd).append(websiteTd).append(dateTd);
		warpperTr.append(operateTd);

		$(config.listWarpperSelector).append(warpperTr);
	}

	return {

		init:init,
	};
});
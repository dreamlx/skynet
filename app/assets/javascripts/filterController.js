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

			switch(queryType)
			{
				case "querypage":
					queryPage(queryValue);
			}
		});
	}

	function queryPage(page)
	{
		model.filterParam.from = (page-1)*20+1;
		model.queryListByFilter();
	}
	return {};

});
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
					break;
				case "qstatus":
					queryStatus(queryValue);
					break;
				case "qmediaType":
					queryMediaType(queryValue);
					break;
				case "qdate":
					queryDate(queryValue);
					break;
				case "qisGood":
					queryDX(queryValue);
					break;
				case "qorder":
					queryOrder(queryValue)
					break;
			}
		});
	}

	function queryStatus(value){
		model.filterParam.state = value;
		model.filterParam.from = 1;
		model.queryListByFilter();
	};

	function queryMediaType(value){
		model.filterParam.sourcetype = value;
		model.filterParam.from = 1;
		model.queryListByFilter();
	};

	function queryDate(value){
		model.filterParam.day_count = value;
		model.filterParam.from = 1;
		model.queryListByFilter();
	};

	function queryDX(value){
		model.filterParam.isgood = value;
		model.filterParam.from = 1;
		model.queryListByFilter();
	};

	function queryPage(page)
	{
		model.filterParam.from = (page-1)*20+1;
		model.queryListByFilter();
	}

	function queryOrder(value)
	{
		model.filterParam.orderby = value;
		model.filterParam.from = 1;
		model.queryListByFilter();
	}

	return {};

});
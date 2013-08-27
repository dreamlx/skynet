require(["jquery", 
	"domReady", 
	"filterModel", 
	"pagination",
	"dataFilter",
	"tableOperateFloat", 
	"tableDataList"],
	function($, domReady, model, page, filter, tableOperate, table){
		// var paginationArr = $(".tablePaginationBlock");
		domReady(function(){
			page.init();
			filter.init(model);
			table.init(model);
			tableOperate.init();
			model.queryListByFilter();

		});
	}
);
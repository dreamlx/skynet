require(["jquery", 
	"domReady", 
	"filterController",
	"filterModel", 
	"pagination",
	"dataFilter",
	"tableOperateFloat", 
	"tableDataList"],
	function($, domReady, controller,model, page, filter, tableOperate, table){
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
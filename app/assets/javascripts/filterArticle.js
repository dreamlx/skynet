require(["jquery", 
	"domReady", 
	"filterController",
	"filterModel", 
	"pagination",
	"dataFilter",
	"tableOperateFloat", 
	"tableDataList",
	"filterOrder"],
	function($, domReady, controller,model, page, filter, tableOperate, table, order){
		// var paginationArr = $(".tablePaginationBlock");
		domReady(function(){
			order.init();
			page.init();
			filter.init(model);
			table.init(model);
			tableOperate.init();
			model.queryListByFilter();

		});
	}
);
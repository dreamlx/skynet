require(["jquery", 
	"domReady", 
	"filterController",
	"filterModel", 
	"pagination",
	"dataFilter",
	"tableOperateFloat", 
	"tableDataList",
	"filterOrder",
	"batchOperate"],
	function($, domReady, controller,model, page, filter, tableOperate, table, order,batch){
		// var paginationArr = $(".tablePaginationBlock");
		domReady(function(){
			order.init();
			page.init();
			filter.init(model);
			table.init(model);
			tableOperate.init();
			batch.init();
			model.queryAllKindAndFilter();

		});
	}
);
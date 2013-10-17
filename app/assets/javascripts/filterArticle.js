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

			$("#homePageBtn").click(function(e){
				window.location.href = "/home/#home";
				e.preventDefault();
			});

			$("#publicPageBtn").click(function(e){
				window.location.href = "/home/#public";
				e.preventDefault();				
			});

			$("#sensitivePageBtn").click(function(e){
				window.location.href = "/home/#sensitive";
				e.preventDefault();				
			});

			$("#reportPageBtn").click(function(e){
				window.location.href = "/home/#report";
				e.preventDefault();				
			});

			$("#monitoringPageBtn").parent().addClass("selected");

		});
	}
);
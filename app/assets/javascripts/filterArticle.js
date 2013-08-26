require(["jquery", "pagination", "domReady", "tableOperateFloat","dataFilter"],function($, p, domReady, table, filter){
	// var paginationArr = $(".tablePaginationBlock");
	domReady(function(){
		p.set(".tablePaginationBlock", ".floatPageSelector");
		table.init();
		filter.init();
	});
});
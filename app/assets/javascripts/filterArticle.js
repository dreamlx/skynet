require(["jquery", "pagination", "domReady", "tableOperateFloat"],function($, p, domReady, table){
	// var paginationArr = $(".tablePaginationBlock");
	domReady(function(){
		p.set(".tablePaginationBlock", ".floatPageSelector");
		table.init();
	});
});
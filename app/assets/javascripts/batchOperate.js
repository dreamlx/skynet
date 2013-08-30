define(["jquery", "filterModel"], function($, model){
	var config = {
		mainDivSelector : ".dataOperateBlock",
		chooseAllInputSelector : ".dataOperateBlock input",
		chooseAllBtnSelector : ".dataOperateBlock span a",
		actionBtnSelector : ".dataOperateBlock>ul a",
		allDataSelector : "#dataTable tr input"
	}

	var init = function(){
		var input = $(config.chooseAllInputSelector);
		$(config.chooseAllBtnSelector).click(function(e){
			if(input.prop("checked") == true)
			{
				input.prop("checked",false);
				deselectAll();
			}else
			{
				input.prop("checked",true);
				selectAll();
			}
			e.preventDefault();
		});

		input.click(function(e){
			//e.preventDefault();
			if($(this).prop("checked") == true)
			{
				selectAll();
				//console.log("!!! ture");
			}else
			{
				deselectAll();
			}
		});

		$(config.actionBtnSelector).click(function(e){
			e.preventDefault();
			$(document).trigger("querybatch", [this.hash]);
		});
	}

	function selectAll()
	{
		$(config.allDataSelector).prop("checked",true);
	}

	function deselectAll()
	{
		// $(config.allDataSelector).removeAttr("checked");
		$(config.allDataSelector).prop("checked",false);
	}

	return {
		init : init
	}
});
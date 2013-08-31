define(['jquery', 'filterModel'],function($, model){

	var _mainDivs;
	var _float;
	var _triggers;
	var _data;
	var config = {
		triggerId : "a.next10PageBtn",
		mainDivWarpperId : ".tablePaginationBlock", 
		floatPageWarpperId : ".floatPageSelector",
		pageLiDom : "<li class='create'><a href=''></a></li>",
		prevPageBtnClass : ".prevPageBtn",
		nextPageBtnClass : ".nextPageBtn",
		first10PageClass : "first10Page",
		last10PageClass : "last10Page",
		only10PageClass : "only10Page"
	};

	var init = function()
	{
		_mainDivs = $(config.mainDivWarpperId);
		_float = $(config.floatPageWarpperId);
		_float.mouseleave(function(e){
			$(this).hide();
		});

		_triggers = _mainDivs.find(config.triggerId);
		// bindShowFloatEvt();

		$(config.prevPageBtnClass).click(function(e){
			var prevPage = model.currentPage - 1;
			if(prevPage <= 0)
			{
				e.preventDefault();
				return
			}
			$(document).trigger("queryfilter", "#querypage="+prevPage);
			e.preventDefault();
		});

		$(config.nextPageBtnClass).click(function(e){
			var nextPage = model.currentPage+1;
			if(nextPage > model.totalPages)
			{
				e.preventDefault();
				return
			}
			$(document).trigger("queryfilter", "#querypage="+nextPage);
			e.preventDefault();
		});

		$(document).bind("listDataCompleted", function(evt){
			if( _mainDivs.find(".create").length > 0 )
			{
				clearPageList();
			};
			buildPageList();
		});
	};

	function buildPageList()
	{
		var total = model.totalPages;
		var cur = model.currentPage;
		_mainDivs.find("span em").text(model.totalArticle);
		_mainDivs.find("span b").text(total);
		
		var pageArrLen;
		if((total-cur) >= 10){
			//页数超过9个页码的，统统设定成10个页码
			pageArrLen = 10;
		}else{

			if(total % 10 == 0)
			{
				//总数正好是10的倍数，当前必须显示10个页码
				pageArrLen = 10
			}else
			{
				//总数不能被10整除的，宗页码只取模除10的余数
				pageArrLen = total % 10;
			}			
		}

		var pageNum;
		if(cur%10 == 0)
		{
			pageNum = (Math.floor(cur / 10)-1)*10+pageArrLen
		}else{
			pageNum = Math.floor(cur / 10)*10+pageArrLen;
		}
		for (var i = pageArrLen; i > 0 ; i--) {
			var li = $(config.pageLiDom);
			li.find("a").attr("href", "#querypage="+pageNum).text(pageNum).click(function(e){
				// console.log(this.hash);
				$(document).trigger("queryfilter", [this.hash]);
				_float.hide();
				e.preventDefault();
			});
			if(pageNum == cur)
			{
				li.find("a").addClass("selected");
			}
			pageNum--;
			_mainDivs.find("ul li:first-child").after(li);
		};
		initFloatSelector();
	}

	function clearPageList()
	{
		$(".create").remove();
	}


	function initFloatSelector()
	{
		//clear li
		$(config.floatPageWarpperId+" li").each(function(i,li){
			if(!$(li).hasClass("noBorderAndBG"))
			{
				$(li).remove();
			}
		});
		//get first page num  
		var firstPageNum = Math.ceil(model.currentPage / 10)*10 + 1;
		var totalPages = model.totalPages;
		if(firstPageNum > totalPages)
		{
			return
		}
		//get last page num
		var diff = (totalPages - firstPageNum);
		var lastPageNum = diff<50?totalPages:firstPageNum+49;
		//get num of page block
		var blockLen = Math.floor((lastPageNum - firstPageNum)/10)+1;

		var startPageNum=firstPageNum;
		var endPageNum;
		var liDom="";
		for(var i = 0; i < blockLen; i++)
		{
			endPageNum = startPageNum+9;
			endPageNum = endPageNum>lastPageNum ? lastPageNum : endPageNum;
			var str = startPageNum+" - "+endPageNum;
			var className="";
			if(blockLen == 1)
			{
				className = config.only10PageClass;
			}else
			{
				if(blockLen-i==1)
				{
					//最后一个block在最上面，所以class是 first10Page
					className = config.first10PageClass;
				}else if(i==0)
				{
					className = config.last10PageClass;
				}
			}

			liDom = "<li class='"+className+"'><a href='#querypage="+startPageNum+"'>"+str+"</a></li>"+liDom;

			startPageNum+=10;
		}

		$(config.floatPageWarpperId+" .noBorderAndBG").before(liDom);
		$(config.floatPageWarpperId+" a").click(function(e){
				// console.log(this.hash);
				$(document).trigger("queryfilter", [this.hash]);
				_float.hide();
				e.preventDefault();
			})
		bindShowFloatEvt();
	};

	function bindShowFloatEvt()
	{
		if(_triggers)
		{
			_triggers.mouseenter(function(e){

				_float.show();

				var position = $(this).position();
				var left = position.left - (_float.width()/2 - 2);
				var top = position.top - _float.height();

				_float.css("top", top).css("left", left);

				
			});
			
		}
	};

	return {
		init: init

	};
});
define(["jquery"],function($){
	var enableClick = false;
    var _data;

	var init = function()
	{
		$.get("/home/weiboList.json",function(data){
            _data = data.arts;
			var arrLen = data.arts.length;
			for(var i=0; i<arrLen; i++)
			{
				var nc = $(".weiboDefaultList ul>li:first-child").clone();
				var content = data.arts[i].text;
				var site = data.arts[i].site;
				var url = data.arts[i].url;
				nc.find("p.weiboListContent").text(content);
				nc.appendTo(".weiboDefaultList ul");
			}
			$(".weiboDefaultList ul>li:first-child").remove();
			enableClick = true;
            $(window).trigger("moduleDataLoaded","weiboList");
		});
	}

	$("#pagePrevBtn").click(function(e){ 
        if(!enableClick)
        {
            e.preventDefault();
            return;
        }
        var lastLiTop = $(".weiboMiniList ul").css("top");
        
        if(parseInt(lastLiTop)>=0)
        {
            e.preventDefault();
            return;
        }
        enableClick = false;
        var curTop = $(".weiboMiniList ul").css("top");
        curTop = parseInt(curTop);
        $(".weiboMiniList ul").animate({"top":curTop+76},"normal","swing",function(){
            enableClick = true;
        });
        // $(".weiboMiniList ul").css();
        e.preventDefault();
    });
    $("#pageNextBtn").click(function(e){
        if(!enableClick)
        {
            e.preventDefault();
            return;
        }
        var lastLiTop = $(".weiboMiniList ul").css("top");
        var n = $(".weiboMiniList ul li").length -1;
        if(parseInt(lastLiTop)<=(n*-76))
        {
            e.preventDefault();
            return;
        }
        enableClick = false;
        var curTop = $(".weiboMiniList ul").css("top");
        curTop = parseInt(curTop);
        $(".weiboMiniList ul").animate({"top":curTop-76},"normal","swing",function(){
            enableClick = true;
        });
        e.preventDefault();
    });

    $("#weiboListBtn").click(function(e){
        e.preventDefault();
        return;
    	// if(!enableClick)
     //    {
     //        e.preventDefault();
     //        return;
     //    }
     //    var miniHeight = 76;
     //    $(this).toggleClass("floatWeiboListBtn");
     //    $(".weiboDefaultList").toggleClass("weiboMiniList");
     //    if($("#weiboList").height() > miniHeight)
     //    {
     //        $(".weiboDefaultList").height(miniHeight);
     //        $("#weiboList").height(miniHeight);
     //        $("#weiboListPageBtnBlock").show();
     //        $("#weiboListBtn").css("margin-top",14);

     //        $(window).off("scroll", scrollHandler);
     //    }else
     //    {
     //        $(".weiboDefaultList ul").css("top",0);
     //        var count = $(".weiboDefaultList ul li").length;
     //        $(".weiboMiniList").height(miniHeight*count);
     //        $("#weiboList").height(miniHeight*count);
     //        $("#weiboListPageBtnBlock").hide();
            
     //        $(window).on("scroll", scrollHandler);
     //    }
     //    e.preventDefault();
    });

    var changeToTable = function()
    {
        if(!enableClick)
        {
            return
        }
        var tableDiv = $("<div class='tabTable' id='weiboListBlock'><div class='tab-content'><div class='tab-pane active' id='tabWeiboList'></div></div></div>");
        var tdTpl = $("<div class='lastestWeiboArticle weiboListTable'><header><h3></h3><span><img src='/assets/weiboLogo.png'></span></header><p></p><span class='lastestData'></span></div>");
        
        $("#weiboList").after(tableDiv);
        buildAllLastest(tdTpl);
    }

    var buildAllLastest = function(tpl)
    {
        for(var i=0;i<_data.length;i++)
        {
            var dom = tpl.clone();
            buildLastest(dom, _data[i]);
            dom.appendTo("#tabWeiboList");
        }
        var allHeight = 107*_data.length;
        $("#weiboListBlock").height(allHeight);
        $("#tabWeiboList").height(allHeight);
        // return allHeight;
    } 

    function buildLastest(dom, data)
    {
        dom.find("h3").html(data.text);
        dom.find(">p").html("<a href='"+data.url+"' target='_blank'>"+data['content']+"</a>");
        dom.find("span.lastestData").html(data.published_at);
    }

    var scrollHandler = function()
    {
    	scrollTop = $(window).scrollTop();
        
        
        if(scrollTop<=1400 && $("#weiboListBtn").hasClass("floatWeiboListBtn"))
        {
            $("#weiboListBtn").css("margin-top", 14+scrollTop);    
        }
    }

	return {
		init:init,
        changeToTable:changeToTable
	}
});
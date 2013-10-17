define(["jquery"],function($){
	var enableClick = false;

	var init = function()
	{
		$.get("/home/weiboList.json",function(data){
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

    var scrollHandler = function()
    {
    	scrollTop = $(window).scrollTop();
        
        
        if(scrollTop<=1400 && $("#weiboListBtn").hasClass("floatWeiboListBtn"))
        {
            $("#weiboListBtn").css("margin-top", 14+scrollTop);    
        }
    }

	return {
		init:init
	}
});
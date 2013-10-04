define(
	["jquery","lastestUpdate","otherChartBlock"], 
	function($, lastest,otherChart){
		$("#homePageBtn").click(function(e){
        	clickNav();
        	$(this).parent().addClass("selected");
        	openHomePage();
    	});
	    $("#publicPageBtn").click(function(e){
	        clickNav();
	        $(this).parent().addClass("selected");
	        openPublicPage();
	    });
	    $("#sensitivePageBtn").click(function(e){
	        clickNav();
	        $(this).parent().addClass("selected");
	        openSensitivePage();
	    });
	    $("#reportPageBtn").click(function(e){
	        clickNav();
	        $(this).parent().addClass("selected");
	        openReportPage();
	    });

		var nowPage = "home";

	    var init = function(hash)
	    {
	    	if(hash.length>0)
	    	{
	    		
		    	nowPage = hash;
	    	}
	    	
	    }

	    function selectNav()
	    {
	    	switch(nowPage)
	    	{
	    		case "public":
	    			$("#publicPageBtn").addClass("selected");
	    			break;
	    		case "sensitive":
	    			$("#sensitivePageBtn").addClass("selected");
	    			break;
	    		case "report":
		    		$("#reportPageBtn").addClass("selected");
	    			break;
	    	}
	    }

	    function clickNav()
		{
		    $(".systemNav ul li").removeClass("selected");
		}

		function openHomePage()
		{
		    nowPage = "home";
		    $("#weiboList").show();
		    $("#lastestUpdate").show();
		    $("#lastestUpdate .lastestYQ").each(function(i, h){
		        if(i!=0)
		        {
		            h.remove();
		        }
		    });
		    $("#lastestUpdate .lastestYJ").each(function(i, h){
		        if(i!=0)
		        {
		            h.remove();
		        }
		    });
		    $("#lastestUpdate #tab1").height(126);
		    $("#lastestUpdate #tab2").height(126);
		    $("#lastestUpdate").height(179);

		    $("#realTimeChartBlock").show();
		    $("#otherChartBlock").show();
		    $("#top10ChartBlock").show();                 
		    $("#weiboTable").show();    
		    $("#weiboTable .tab-pane").height(260);
		    $("#weiboTable .tab-pane").css("overflow","hidden");
		    $("#weiboTable table").css("overflow","hidden");
		    $("#weiboTable table tbody").css("overflow","hidden");
		    if($("#realTimeChartBlock").hasClass("whenLess"))
		    {
		        $("#moreInfoBlock").hide();        
		    }else
		    {
		        $("#moreInfoBlock").show();  
		    }

		    
		    $(".lessMoreBtn").show();

		    var miniHeight = 76;
		    $("#weiboListBtn").removeClass("floatWeiboListBtn")
		    $(".weiboDefaultList").addClass("weiboMiniList");
		    $(".weiboDefaultList").height(miniHeight);
		    $("#weiboList").height(miniHeight);
		    $("#weiboListPageBtnBlock").show();
		    
		}

		var openPublicPage = function()
		{
		    nowPage = "public";
		    $("#weiboList").show();
		    $("#lastestUpdate").hide();
		    $("#realTimeChartBlock").hide();
		    $("#moreInfoBlock").hide();    
		    $(".lessMoreBtn").hide();

		    var miniHeight = 76;
		    if(!$("#weiboListBtn").hasClass("floatWeiboListBtn"))
		    {
		        $("#weiboListBtn").addClass("floatWeiboListBtn");
		        $(".weiboDefaultList").removeClass("weiboMiniList");
		        $(".weiboDefaultList ul").css("top",0);
		        // var count = $(".weiboDefaultList ul li").length;
		        var count = 20;
		        $(".weiboMiniList").height(miniHeight*count);
		        $("#weiboList").height(miniHeight*count);
		        $("#weiboListPageBtnBlock").hide();
		    }
		}

		var openSensitivePage = function()
		{
		    nowPage = "sensitive";
		    $("#weiboList").hide();
		    $("#lastestUpdate").show();
		    $("#realTimeChartBlock").hide();
		    $("#moreInfoBlock").hide();    
		    $(".lessMoreBtn").hide();

		    lastest.openAllLastest();
		}

		var openReportPage = function()
		{
		    nowPage = "report";
		    $("#weiboList").hide();
		    $("#lastestUpdate").hide();
		    $("#realTimeChartBlock").show();
		    $("#moreInfoBlock").show();
		    $("#otherChartBlock").show();
		    $("#top10ChartBlock").show();    
		    $("#weiboTable").show();   
		    $(".lessMoreBtn").hide();

			otherChart.initCharts();
		}

		return {
			init:init,
			openPublicPage:openPublicPage,
			openSensitivePage:openSensitivePage,
			openReportPage:openReportPage
		}
	}
);
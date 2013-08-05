// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery.easing.min
//= require jquery.simpleTabs
//= require printThis
//= require Chart.min
//= require html2canvas
//= require plugins
//= require home

//= require jspdf/jspdf
//= require jspdf/adler32cs
//= require jspdf/FileSaver.min
//= require jspdf/BlobBuilder
//= require jspdf/jspdf.plugin.addimage
//= require jspdf/jspdf.plugin.standard_fonts_metrics
//= require jspdf/jspdf.plugin.split_text_to_size
//= require jspdf/jspdf.plugin.from_html


//= require main



//gon 的变量
//动态趋势图
//alert(gon.realTimeChartBlock);
//alert(gon.realTimeChartTitle);

//[全部调性]
//      alert(gon.qbdx_today);
//      gon.qbdx_yesterday
//      gon.qbdx_15days

//      #[媒体类型]
//      gon.media_kind_today
//      gon.media_kind_yesterday
//      gon.media_kind_15days 

//      #top10
//      gon.top10_today 
//      gon.top10_yesterday
//      gon.top10_15days 

// $(function(){
// 	$('.mainContainer').hide();
// 	$('#globalHeader').hide().delay(300).slideDown(1000, function(){
// 		$('.mainContainer').slideDown(2500);
// 	});

// });
var enableClick = false;
var lastestYQ = [];
var lastestYJ = [];
$(function(){
    $.get("/home/unreadItems.json", function(data){
        var obj = data.data;

        if(obj.yq_num>0)
        {
            $("#yqNum").show();
            $("#yqNum").text(obj.yq_num);
        }

        if(obj.yj_num>0)
        {
            $("yjNum").show();
            $("#yjNum").text(obj.yj_num);
        }
        if(obj.wb_num>0)
        {
            $("#wbNum").show();
            $("#wbNum").text(obj.wb_num);
        }
    });
    

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
	});


	$.get("/home/weibo_yq.json", function(data){
		// console.info(data);
		// console.log(data.arts.length);
        lastestYQ = data;
        if(nowPage == "home")
        {
    		var arrLen = data.length;
    		var lastest = data[arrLen - 1];
            var lastestDom = $(".lastestYQ:first");
            buildLastest(lastestDom, lastest);
        }else
        {
            
            var allHeight = buildAllLastest(data, "YQ", 1);
            if(allHeight+49 > $("#lastestUpdate").height())
            {
                $("#lastestUpdate").height(allHeight+49);                
            }
        }
    });

    $.get("/home/weibo_yj.json", function(data){
        // console.log(data.arts.length);
        lastestYJ = data;
        if(nowPage == "home")
        {
            var arrLen = data.length;
            var lastest = data[arrLen - 1];
            var lastestDom = $(".lastestYJ:first");
    		buildLastest(lastestDom, lastest);
        }else
        {
            var allHeight = buildAllLastest(data, "YJ", 2);
            if(allHeight+49 > $("#lastestUpdate").height())
            {
                $("#lastestUpdate").height(allHeight+49);                
            }
        }
	});

	// $.get("/home/realTimeChartTitle.json", function(data){
		// console.info(data);
	// });

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
    	if(!enableClick)
        {
            e.preventDefault();
            return;
        }
        var miniHeight = 76;
        $(this).toggleClass("floatWeiboListBtn");
        $(".weiboDefaultList").toggleClass("weiboMiniList");
        if($("#weiboList").height() > miniHeight)
        {
            $(".weiboDefaultList").height(miniHeight);
            $("#weiboList").height(miniHeight);
            $("#weiboListPageBtnBlock").show();
        }else
        {
            $(".weiboDefaultList ul").css("top",0);
            var count = $(".weiboDefaultList ul li").length;
            $(".weiboMiniList").height(miniHeight*count);
            $("#weiboList").height(miniHeight*count);
            $("#weiboListPageBtnBlock").hide();
            
        }
        e.preventDefault();
    });

    $('#lastestUpdate').simpleTabs();
    $('#weiboTable').simpleTabs();



    $("#lastestUpdate a.closeLastestBtn").click(function(e){
        e.preventDefault();
        $("#lastestUpdate").animate({height:"51px"},"normal","swing",function(){
            
        });

        // $("#lastestUpdate div.tab-pane").removeClass("active");
    });

    $("#lastestUpdate ul.tab-items a").click(function(e){
        if($("#lastestUpdate").height()<170)
        {
            $("#lastestUpdate").height(179);
        }
    }); 

    $("#homePageBtn").click(function(e){
        openHomePage();
    });
    $("#publicPageBtn").click(function(e){
        openPublicPage();
    });
    $("#sensitivePageBtn").click(function(e){
        openSensitivePage();
    });
    $("#reportPageBtn").click(function(e){
        openReportPage();
    });
    $("#monitoringPageBtn").click(function(e){
        openMonitoringPage();
    });

});

function buildAllLastest(data, type, tab)
{
    var tpl = $(".lastest"+type+":first");
    for(var i=0;i<data.length;i++)
    {
        var dom = tpl.clone();
        buildLastest(dom, data[i]);
        dom.appendTo("#lastestUpdate #tab"+tab);
    }
    tpl.remove();
    var allHeight = 107*data.length;
    $("#lastestUpdate #tab"+tab).height(allHeight);
    return allHeight;
}

function buildLastest(dom, data)
{
	dom.find("h3").html(data.text);
	dom.find(">p").html("<a href='"+data.url+"' target='_blank'>"+data['content']+"</a>");
	dom.find("span.lastestData").html(data.published_at);
}

function setRealTimeChart(_data)
{
    var lcContext = $("#lineChart").get(0).getContext("2d");
    var lineChartOpt = 
    {
        bezierCurve:false,
        datasetStrokeWidth:5,
        pointDotRadius:5,
        scaleLineColor:"#616161",
        scaleLineWidth:2
    };
    var myLcChart = new Chart(lcContext).Line(_data, lineChartOpt);
}

var nowPage = "home";
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

function openPublicPage()
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
        var count = $(".weiboDefaultList ul li").length;
        $(".weiboMiniList").height(miniHeight*count);
        $("#weiboList").height(miniHeight*count);
        $("#weiboListPageBtnBlock").hide();
    }
}

function openSensitivePage()
{
    nowPage = "sensitive";
    $("#weiboList").hide();
    $("#lastestUpdate").show();
    $("#realTimeChartBlock").hide();
    $("#moreInfoBlock").hide();    
    $(".lessMoreBtn").hide();

    var h1=0;
    var h2=0
    if(lastestYQ.length>0)
    {
        h1 = buildAllLastest(lastestYQ, "YQ", 1);   
    }
    if(lastestYJ.length>0)
    {
        h2 = buildAllLastest(lastestYJ, "YJ", 2);
    }
    if(h1>0 || h2>0)
    {
        var allHeight = h1>h2?h1:h2
        $("#lastestUpdate").height(allHeight+49);        
    }
    
}

function openReportPage()
{
    nowPage = "report";
    $("#weiboList").hide();
    $("#lastestUpdate").hide();
    $("#realTimeChartBlock").show();
    $("#moreInfoBlock").show();
    $("#otherChartBlock").show();
    $("#top10ChartBlock").show();    
    $("#weiboTable").hide();   
    $(".lessMoreBtn").hide();

    if(!$("#moreInfoBlock").hasClass("ChartHasContent"))
    {
        $("#moreInfoBlock").addClass("ChartHasContent");
        $.get("/home/qbdx_t.json", function(data){
            makeQbdxData("t", data.data.dx);
            setQbdxChart(qbdxDataCollection.t);
        }); 
        $.get("/home/media_t.json", function(data){
            makeMediaData("t", data.data.media);
            setMediaChart(mediaDataCollection.t);    
        }); 
        $.get("/home/top10_t.json", function(data){
            makeTop10Data("t", data.data.top10);
            setBarChart(top10DataCollection.t);    
        }); 
               
    }

}

function openMonitoringPage()
{
    nowPage = "monitoring";
    $("#weiboList").hide();
    $("#lastestUpdate").hide();
    $("#realTimeChartBlock").hide();
    $("#moreInfoBlock").show(); 
    $("#otherChartBlock").hide();
    $("#top10ChartBlock").hide();   
    $("#weiboTable").show();   
    $(".lessMoreBtn").hide();

    var tabHeight = $("#weiboTable .tab-pane").height();
    var trLength = $("#weiboTable #table0 tbody tr").size();

    if(!$("#weiboTable").hasClass("weiboTableHasData"))
    {
        $("#weiboTable").addClass("weiboTableHasData");
        $.get("/home/weiboTable", function(data){
            buildWeiboTable(data);
            trLength = $("#weiboTable #table0 tbody tr").size();
            if(trLength>5)
            {
                tabHeight += (39*(trLength - 5));
                $("#weiboTable .tab-pane").height(tabHeight); 
            }
        });  
    }

    if(trLength>5)
    {
        tabHeight += (39*(trLength - 5));
        $("#weiboTable .tab-pane").height(tabHeight); 
    }
    
    $("#weiboTable .tab-pane").css("overflow","visible");
    $("#weiboTable table").css("overflow","visible");
    $("#weiboTable table tbody").css("overflow","visible");
}
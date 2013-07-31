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
$(function(){
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
		var arrLen = data.length;
		var lastest = data.pop();
		buildLastest("YQ", lastest);
	});

	$.get("/home/weibo_yj.json", function(data){
		// console.log(data.arts.length);
		var arrLen = data.length;
		var lastest = data.pop();
		buildLastest("YJ", lastest);
	});

	$.get("/home/realTimeChartTitle.json", function(data){
		// console.info(data);
	});

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

function buildLastest(type, data)
{
	$("#lastest"+type+" h3").html(data.text);
	$("#lastest"+type+">p").html("<a href='"+data.url+"' target='_blank'>"+data['content']+"</a>");
	$("#lastest"+type+" span.lastestData").html(data.published_at);

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

var nowPage = "";
function openHomePage()
{
    $("#weiboList").show();
    $("#lastestUpdate").show();
    $("#realTimeChartBlock").show();
    if($("#realTimeChartBlock").hasClass("whenLess"))
    {
        $("#moreInfoBlock").hide();        
    }else
    {
        $("#moreInfoBlock").show();  
        if($("#otherChartBlock").css("display") == "none")
        {
            $("#otherChartBlock").show();
            $("#top10ChartBlock").show(); 
        }
        if($("#weiboTable").css("display") == "none")
        {
            $("#weiboTable").show();
        }      
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
    $("#weiboList").hide();
    $("#lastestUpdate").show();
    $("#realTimeChartBlock").hide();
    $("#moreInfoBlock").hide();    
    $(".lessMoreBtn").hide();
}

function openReportPage()
{
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
    $("#weiboList").hide();
    $("#lastestUpdate").hide();
    $("#realTimeChartBlock").hide();
    $("#moreInfoBlock").show(); 
    $("#otherChartBlock").hide();
    $("#top10ChartBlock").hide();   
    $("#weiboTable").show();   
    $(".lessMoreBtn").hide();

    if(!$("#weiboTable").hasClass("weiboTableHasData"))
    {
        $("#weiboTable").addClass("weiboTableHasData");
        $.get("/home/weiboTable", function(data){
            buildWeiboTable(data);
        });  
    }
}
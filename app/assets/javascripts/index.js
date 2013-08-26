//pie chart
// var unFmtQbdxArray = [gon.qbdx_today.data.dx,gon.qbdx_yesterday.data.dx,gon.qbdx_15days.data.dx];
var qbdxDataCollection = {};
var qbdxDoughnutColors = ["#e74c3c","#34495e","#5fccff"];
function makeQbdxData(day, data)
{
    var unFmtData = data;
    var dayData = [];
    for(var i=0;i<unFmtData.length;i++)
    {
        dayData.push({
            value : unFmtData[i].value,
            color : qbdxDoughnutColors[i]
        });
    }
    qbdxDataCollection[day] = dayData;
        
}

// var unFmtMediaArray = [gon.media_kind_today.data.media,gon.media_kind_yesterday.data.media,gon.media_kind_15days.data.media];
var mediaDoughnutColors = ["#e74c3c","#34495e","#00a268","#5fccff","#3498db"];
var mediaDataCollection = {};
function makeMediaData(day, data)
{
    var unFmtData = data;
    var dayData = [];
    for(var i=0;i<unFmtData.length;i++)
    {
        dayData.push({
            value : unFmtData[i].value,
            color : mediaDoughnutColors[i]
        });
    }
    mediaDataCollection[day] = dayData;

}

// var unFmtTop10 = [gon.top10_today.data.top10,gon.top10_yesterday.data.top10,gon.top10_15days.data.top10];
var top10DataCollection = {};
function makeTop10Data(day, data)
{
    var dayDataArr = data;
    var chartlabels = [];
    var chartData = [];
    for(var n=0;n<dayDataArr.length;n++)
    {
        chartlabels.push(dayDataArr[n].sitename);
        chartData.push(dayDataArr[n].value);
    }
    var dayData = 
    {
        labels:chartlabels,
        datasets:[
            {
                fillColor:"#e74c3c",
                strokeColor:"#e74c3c",
                data:chartData
            }
        ]
    }
    top10DataCollection[day] = dayData;
};

$(function() {
    $(window).scroll(function(){
        scrollTop = $(this).scrollTop();
        
        
        if(scrollTop<=1400 && $("#weiboListBtn").hasClass("floatWeiboListBtn"))
        {
            $("#weiboListBtn").css("margin-top", 14+scrollTop);    
        }

        var blockOffset = $("#realTimeChartBlock").offset().top - $(window).height();
        if(scrollTop > 200+blockOffset)
        {
            if(!$("#lineChart").hasClass("ChartHasContent"))
            {
                $("#lineChart").addClass("ChartHasContent");
                $.get("/home/realTimeChart.json", function(data){
                    var realTimeChartData = makeRealTimeArr(data);
                    setRealTimeChart(realTimeChartData);     
                }); 
            }
        }
    });   

    var blockOffset = $("#realTimeChartBlock").offset().top - $(window).height();
    var blockTitleHeight = 124;
    if(blockOffset+blockTitleHeight<0)
    {
        if(!$("#lineChart").hasClass("ChartHasContent"))
        {
            $("#lineChart").addClass("ChartHasContent");
            $.get("/home/realTimeChart.json", function(data){
                var realTimeChartData = makeRealTimeArr(data);
                setRealTimeChart(realTimeChartData);     
            }); 
        }
    }

    $(".chartTabs ul li").click(function(e){
        e.preventDefault();
        $(this).prevAll().find("a").removeClass("currentChartTabBtn").addClass("chartTabBtn");
        $(this).nextAll().find("a").removeClass("currentChartTabBtn").addClass("chartTabBtn");
        $(this).find("a").addClass("currentChartTabBtn");
            
        var chart = $(this).find("a").attr("id").substr(0,1);
        var day = $(this).find("a").attr("id").substr(-1,1);
        // console.log(chart,day);
        updateChartData(chart, day);
    })

    $("#lessInfoBtn").click(function(e){
        e.preventDefault();
        $("#realTimeChartBlock").toggleClass("whenLess");
        toggleOtherInfo(!$("#realTimeChartBlock").hasClass("whenLess"));
        // $("#moreInfoBlock").hide();
    });


    $(".downloadBtn").click(function(e){
        var config = this.hash.substr(1,1);
        config = config == "q" || config == "m"?"small":"big"
        savePdf(this.hash, config);
        e.preventDefault();
    });

    $(".printBtn").click(function(e){
        printDiv(this.hash);
        e.preventDefault();
    })

    // setDefaultCharts();
});

function updateChartData(_chart, _day)
{
    var chartInstance;
    var cData;    
    switch(_chart)
    {
        case "q":            
            if(qbdxDataCollection[_day] == null)
            {
                $.get("/home/qbdx_"+_day+".json", function(data){
                    makeQbdxData(_day, data.data.dx);
                    setQbdxChart(qbdxDataCollection[_day]);
                }); 
            } else
            {
                setQbdxChart(qbdxDataCollection[_day]);
            }
            break;
        case "m":
            if(mediaDataCollection[_day] == null)
            {
                $.get("/home/media_"+_day+".json", function(data){
                    makeMediaData(_day, data.data.media);
                    setMediaChart(mediaDataCollection[_day]);
                }); 
            }else
            {
                setMediaChart(mediaDataCollection[_day]);
            }
            break;
        case "t":
            if(top10DataCollection[_day] == null)
            {
                $.get("/home/top10_"+_day+".json", function(data){
                    makeTop10Data(_day, data.data.top10);
                    setBarChart(top10DataCollection[_day]);
                }); 
            }else
            {
                setBarChart(top10DataCollection[_day]);
            }
            break;
        default:
            console.error("update chart data error!");
            return;
    }
}

function toggleOtherInfo(open)
{
    var warpHeight = $(".rightWarp").height();

    if(!open)
    {
        //close the more info block
        $("#moreInfoBlock").hide();
        $("html,body").animate({scrollTop:$(".mainContainer").offset().top})
        $("#lessInfoBtn").html("<span class='spritebg moreIcon'></span>展开更多详情");
    }else
    {
       $("#moreInfoBlock").slideDown("slow",
            function(){
                $("body").animate(
                    {scrollTop:$("#moreInfoBlock").offset().top},
                    1000,
                    function(){
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
                        if(!$("#weiboTable").hasClass("weiboTableHasData"))
                        {
                            $("#weiboTable").addClass("weiboTableHasData");
                            $.get("/home/weiboTable", function(data){
                                buildWeiboTable(data);
                            });  
                        }
                    }
                );
            }
        );
        $("#lessInfoBtn").html("<span class='spritebg lessIcon'></span>查看精简信息");        
    }
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

function setQbdxChart(_data)
{
    var qbdxContext = $("#qbdxDoughnutChart").get(0).getContext("2d");
    var doughnutChartOpt = {segmentStrokeWidth:1};
    var myQbdxChart = new Chart(qbdxContext).Doughnut(_data, doughnutChartOpt);
}

function setMediaChart(_data)
{
    var mediaContext = $("#mediaDoughnutChart").get(0).getContext("2d");
    var doughnutChartOpt = {segmentStrokeWidth:1};
    var myMediaChart = new Chart(mediaContext).Doughnut(_data, doughnutChartOpt);
}

function setBarChart(_data)
{
    var barContext = $("#barChart").get(0).getContext("2d");
    var barChartOpt=
    {
        scaleShowLabels:true,
        barShowStroke:false
    };
    var myBarChart = new Chart(barContext).Bar(_data, barChartOpt);
}

function savePdf(_divId, _config)
{
    var dom = $(_divId);
    dom.find("figure").hide();

    html2canvas(dom, {
        onrendered: function(canvas) {
            data = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
            // Convert the data to binary form
            data = atob(data)
            // document.body.appendChild(canvas);
            var doc = new jsPDF('landscape');
            if(_config == "big")
            {
                doc.addImage(data, 'JPEG', 10, 50, 280, 107);
            }else
            {
                doc.addImage(data, 'JPEG', 10, 50, 150, 150);
            }

            doc.save('skynet.pdf');
            dom.find("figure").show();
            
        }
    });
}

function printDiv(_divId)
{
    var dom = $(_divId);
    dom.find("figure").hide();

    html2canvas(dom, {
        onrendered: function(canvas) {
            $("<img id='printImg'>").appendTo("body").attr("src",canvas.toDataURL('image/jpeg'));
            $("img#printImg").printThis();
            $("img#printImg").remove();
            dom.find("figure").show();
        }
    });
    
}

function makeRealTimeArr(data)
{
    var realTimeArr = data.charts;
    var realTimeLabels = [];
    var realTimeData = []
    for (var i = 0; i < realTimeArr.length; i++)
    {
        var dateLabel = realTimeArr[i].date;
        var month = dateLabel.substring(5,7);
        var day = dateLabel.substring(8,10);
        realTimeLabels.push(month+"/"+day);
        realTimeData.push(realTimeArr[i].value);
    };
    var realTimeChartData = 
    {
        labels: realTimeLabels,
        datasets: [{
            fillColor: "rgba(0,0,0,0)",
            strokeColor: "#e74c3c",  
            pointColor: "#FFFFFF",  
            pointStrokeColor:"#e74c3c",
            data:realTimeData
        }]   
    }

    return realTimeChartData;
}

function buildWeiboTable(data)
{
    var tableTpl = $("#weiboTable .tab-content #table0 table");
    var trTpl = tableTpl.find("tbody tr").clone();
    tableTpl.find("tbody tr").remove();
    $("#weiboTable .tab-content #table0 table").remove();
    var tabLen = data.length;
    for(var i=0 ; i< tabLen;i++)
    {
        var arr = data[i];
        var table = tableTpl.clone();        
        table.appendTo("#weiboTable #table"+i);
        for(var j=0;j<arr.length;j++)
        {
            var obj = arr[j];
            var index = j+1;
            var content = obj.text;
            var url = obj.url;
            var media = obj.media;
            var pdate = obj.published_at;

            var tr = trTpl.clone();
            tr.find("th span").html(index.toString());
            tr.find("td.weiboTableContent").html("<a href='"+url+"'' target='_blank'>" + content + "</a>")
            tr.find("td.weiboMediaType").html(media);
            tr.find("td.weiboTimeTd").html(pdate);
            table.find("tbody").append(tr);
        }
    }
    tableTpl = null;
    trTpl = null;

    // console.log($("#weiboTable table tbody tr").size());
    $("#weiboTable a.closeLastestBtn").click(function(e){
        e.preventDefault();
        var tb = $(this).parentsUntil(".tab-pane","table");
        var oldHeight = tb.height()
        tb.height(oldHeight-39);
        $(this).parent().parent().remove();
    });
}
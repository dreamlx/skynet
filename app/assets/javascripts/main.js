
    var myChart;//line chart
    var myData = new Array(["05/12", 7.80], ["05/13", 4.80], ["05/14", 6.50], ["05/15", 6.10], ["05/16", 4.40], ["05/17", 5.80], ["05/18", 4.00], ["05/19", 8.50], ["05/20", 8.90], ["05/21", 9.20]);

    //pie chart
    var qbdxData1 = new Array(['', 70], ['', 25], ['', 5]);
    var qbdxData2 = new Array(["",75], ['', 20], ['', 5]);
    var qbdxData3 = new Array(['',70], ['', 20], ['', 10]);
    var qbdxDataCollection = new Array(qbdxData1,qbdxData2,qbdxData3);
    var pieChartOne;

    var mediaData1 = new Array(['', 45], ['', 35], ['', 10], ['', 5], ['', 5]);
    var mediaData2 = new Array(['', 45], ['', 25], ['', 15], ['', 10], ['', 5]);
    var mediaData3 = new Array(['', 40], ['', 30], ['', 15], ['', 8], ['', 7]);
    var mediaDataCollection = new Array(mediaData1, mediaData2, mediaData3);
    var pieChartTwo;

    var top10data1 = new Array(['Asia', 437], ['车易网', 322], ['新浪微博', 233], ['新浪博客', 110], ['网易微博', 54], ['百度贴吧', 33], ['汽车之家', 30], ["auto.youth.cn", 23], ["shijitg.com", 19], ["365jia.cn", 15]);  
    var top10data2 = new Array(['Asia', 467], ['车易网', 342], ['新浪微博', 234], ['新浪博客', 610], ['网易微博', 44], ['百度贴吧', 23], ['汽车之家', 20], ["auto.youth.cn", 13], ["shijitg.com", 9], ["365jia.cn", 5]);  
    var top10data3 = new Array(['Asia', 1437], ['车易网', 1322], ['新浪微博', 933], ['新浪博客', 610], ['网易微博', 554], ['百度贴吧', 333], ['汽车之家', 330], ["auto.youth.cn", 223], ["shijitg.com", 119], ["365jia.cn", 115]);  
    var top10DataCollection = new Array(top10data1,top10data2,top10data3);
    var barChart;

    $(function() {
        $("#pagePrevBtn").click(function(e){ 
            var lastLiTop = $("#weiboMiniList li:first-child").css("top");
            
            if(parseInt(lastLiTop)>=0)
            {
                return;
            }
            var curTop = $("#weiboMiniList li:first-child").css("top");
            curTop = parseInt(curTop);
            $("#weiboMiniList li").css("top",curTop+68);
        });
        $("#pageNextBtn").click(function(e){
            var lastLiTop = $("#weiboMiniList li:last-child").css("top");
            var n = $("#weiboMiniList li").length -1;
            if(parseInt(lastLiTop)<=(n*-68))
            {
                return;
            }
            var curTop = $("#weiboMiniList li:first-child").css("top");
            curTop = parseInt(curTop);
            $("#weiboMiniList li").css("top",curTop-68);
        });
        $('#lastestUpdate').simpleTabs();
        $('#weiboTable').simpleTabs();

        
        $("#lessInfoBtn").click(function(e){
            e.preventDefault();
            toggleOtherInfo();
            // $("#moreInfoBlock").hide();
        });

        $(".chartTabs ul li").click(function(e){
            e.preventDefault();
            $(this).prevAll().find("a").removeClass("currentChartTabBtn").addClass("chartTabBtn");
            $(this).nextAll().find("a").removeClass("currentChartTabBtn").addClass("chartTabBtn");
            $(this).find("a").addClass("currentChartTabBtn");
                
            var chart = $(this).find("a").attr("id").substr(0,1);
            var id = $(this).find("a").attr("id").substr(-1,1);
            console.log(chart,id);
            updateChartData(chart, id)
        })

        $("#lastestUpdate a.closeLastestBtn").click(function(e){
            e.preventDefault();
            $("#lastestUpdate").animate({height:"58px"},"normal","swing",function(){
                myChart.draw();
                var h = $("#warpHeight").height()
                $("#warpHeight").height(parseInt(h)-121);
            });

            // $("#lastestUpdate div.tab-pane").removeClass("active");
        });

        $("#lastestUpdate ul.tab-items a").click(function(e){
            if($("#lastestUpdate").height()<170)
            {
                $("#lastestUpdate").animate({height:"179px"},"normal","swing",function(){
                    myChart.draw();
                    var h = $("#warpHeight").height()
                $("#warpHeight").height(parseInt(h)+121);
                });
            }
        });

        setCharts();
    });

    function updateChartData(_chart, _id)
    {
        var chartInstance;
        var cData;
        switch(_chart)
        {
            case "q":
                chartInstance = pieChartOne;
                cData = qbdxDataCollection;
                break;
            case "m":
                chartInstance = pieChartTwo;
                cData = mediaDataCollection;
                break;
            case "t":
                chartInstance = barChart;
                cData = top10DataCollection;
                break;
            default:
                return;
        }

        chartInstance.setDataArray(cData[(_id-1)]);
        chartInstance.draw();
    }

    function toggleOtherInfo()
    {
        var warpHeight = $(".rightWarp").height();

        if(warpHeight>841)
        {
            //close the more info block
            $("#moreInfoBlock").hide();
            $("html,body").animate({scrollTop:$(".mainContainer").offset().top})
            $("#lessInfoBtn").html("<span class='spritebg moreIcon'></span>展开更多详情");
        }else
        {
           $("#moreInfoBlock").slideDown("slow",function(){
                $("html,body").animate({scrollTop:$("#moreInfoBlock").offset().top})
            });
            $("#lessInfoBtn").html("<span class='spritebg lessIcon'></span>查看精简信息");     
        }
    }

    function setCharts()
    {
        
        myChart = new JSChart('lineChart', 'line');
        myChart.setDataArray(myData);
        myChart.setTitle('');
        myChart.setAxisNameX('');
        myChart.setAxisNameY('');
        myChart.setAxisColor('#7e7e7e');
        myChart.setAxisValuesColor('#949494');
        myChart.setAxisPaddingLeft(50);
        myChart.setAxisPaddingRight(20);
        myChart.setAxisPaddingTop(0);
        myChart.setAxisPaddingBottom(20);
        myChart.setAxisValuesDecimals(3);
        myChart.setAxisValuesNumberX(10);
        myChart.setShowXValues(false);
        myChart.setGridColor('#F8F8F8');
        myChart.setLineColor('#d4211e');
        myChart.setLineWidth(5);
        myChart.setFlagColor('#d4211e');
        myChart.setFlagRadius(6);
        myChart.setTooltip(["05/12", 'GDP 7.80']);
        myChart.setTooltip(["05/13", 'GDP 4.80']);
        myChart.setTooltip(["05/14", 'GDP 6.50']);
        myChart.setTooltip(["05/15", 'GDP 6.10']);
        myChart.setTooltip(["05/16", 'GDP 4.40']);
        myChart.setTooltip(["05/17", 'GDP 5.80']);
        myChart.setTooltip(["05/18", 'GDP 4.00']);
        myChart.setTooltip(["05/19", 'GDP 8.50']);
        myChart.setTooltip(["05/20", 'GDP 8.90']);
        myChart.setTooltip(["05/21", 'GDP 9.20']);
        myChart.setLabelX(["05/12", '05/12']);
        myChart.setLabelX(["05/13", '05/13']);
        myChart.setLabelX(["05/14", '05/14']);
        myChart.setLabelX(["05/15", '05/15']);
        myChart.setLabelX(["05/16", '05/16']);
        myChart.setLabelX(["05/17", '05/17']);
        myChart.setLabelX(["05/18", '05/18']);
        myChart.setLabelX(["05/19", '05/19']);
        myChart.setLabelX(["05/20", '05/20']);
        myChart.setLabelX(["05/21", '05/21']);
        myChart.setSize(800, 135);
        myChart.draw();


        

        var qbdxColors = ['#d41810', '#e6e6e6', '#b2140c',];
        pieChartOne = new JSChart('qbdxPieChart', 'pie');
        pieChartOne.setDataArray(qbdxData1);
        pieChartOne.colorizePie(qbdxColors);
        pieChartOne.setPiePosition(88,88);
        pieChartOne.setTitle("");
        pieChartOne.setPieUnitsColor('#9B9B9B');
        pieChartOne.setPieValuesColor('#FFFFFF');
        pieChartOne.setSize(325, 325);
        pieChartOne.draw();

        

        var qbdxColors = ['#d41810', '#e6e6e6', '#6c7273','#4e5457', '#b2140c'];
        pieChartTwo = new JSChart('mediaPieChart', 'pie');
        pieChartTwo.setDataArray(mediaData1);
        pieChartTwo.colorizePie(qbdxColors);
        pieChartTwo.setPiePosition(88,88);
        pieChartTwo.setTitle("");
        pieChartTwo.setPieUnitsColor('#9B9B9B');
        pieChartTwo.setPieValuesColor('#FFFFFF');
        pieChartTwo.setSize(325, 325);
        pieChartTwo.draw();

        

        barChart = new JSChart('top10Chart', 'bar');
        barChart.setDataArray(top10data1);
        barChart.setBarColor("#d3180f");
        barChart.setTitle('');
        barChart.setAxisNameX('');
        barChart.setAxisNameY('');
        barChart.setAxisColor('#c6c6c6');
        barChart.setAxisWidth(1);
        barChart.setAxisNameColor('#9a9a9a');
        barChart.setAxisValuesColor('#939393');
        barChart.setAxisPaddingTop(35);
        barChart.setAxisPaddingLeft(30);
        barChart.setAxisPaddingRight(0);
        barChart.setAxisPaddingBottom(60);
        barChart.setTextPaddingBottom(20);
        barChart.setTextPaddingLeft(15);
        barChart.setTitleFontSize(11);
        barChart.setBarBorderWidth(0);
        barChart.setBarSpacingRatio(50);
        barChart.setBarValuesColor('#737373');
        barChart.setSize(778, 280);
        barChart.draw();
    }

    var realTimeArr = gon.realTimeChartBlock.charts;
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

    //pie chart
    var unFmtQbdxArray = [gon.qbdx_today.data.dx,gon.qbdx_yesterday.data.dx,gon.qbdx_15days.data.dx];
    var qbdxDoughnutColors = ["#e74c3c","#34495e","#5fccff"];
    var qbdxDataCollection = [];
    for(var j=0;j<unFmtQbdxArray.length;j++)
    {
        var unFmtData = unFmtQbdxArray[j];
        var dayData = [];
        for(var jj=0;jj<unFmtData.length;jj++)
        {
            dayData.push({
                value : unFmtData[jj].value,
                color : qbdxDoughnutColors[jj]
            });
        }
        qbdxDataCollection.push(dayData);
    }

    var unFmtMediaArray = [gon.media_kind_today.data.media,gon.media_kind_yesterday.data.media,gon.media_kind_15days.data.media];
    var mediaDoughnutColors = ["#e74c3c","#34495e","#00a268","#5fccff","#3498db"];
    var mediaDataCollection = [];
    for(var k=0;k<unFmtMediaArray.length;k++)
    {
        var unFmtData = unFmtMediaArray[k];
        var dayData = [];
        for(var kk=0;kk<unFmtData.length;kk++)
        {
            dayData.push({
                value : unFmtData[kk].value,
                color : mediaDoughnutColors[kk]
            });
        }
        mediaDataCollection.push(dayData);
    }

    var unFmtTop10 = [gon.top10_today.data.top10,gon.top10_yesterday.data.top10,gon.top10_15days.data.top10];
    var top10DataCollection = [];
    for (var m = 0; m < unFmtTop10.length; m++)
    {
        var dayDataArr = unFmtTop10[m];
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
        top10DataCollection.push(dayData);
    };
    var enableClick = true;
    $(function() {

        $("#pagePrevBtn").click(function(e){ 
            if(!enableClick)
            {
                e.preventDefault();
                return
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
                return
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

        $(window).scroll(function(){
            scrollTop = $(this).scrollTop();
            if(scrollTop>200)
            {
                $(".floatMainBanner").show();
            }else if(scrollTop<200)
            {
                $(".floatMainBanner").hide();
            }

            if(scrollTop<=200)
            {
                $(".floatWeiboListBtn").css("top", 250);    
            }else if(scrollTop > 200 && scrollTop <= 1600)
            {
                $(".floatWeiboListBtn").css("top", scrollTop+70);    
            }
            var blockOffset = $("#realTimeChartBlock").offset().top - 576;
            if(scrollTop > 200+blockOffset)
            {
                if(!$("#lineChart").hasClass("ChartHasContent"))
                {
                    $("#lineChart").addClass("ChartHasContent");
                    setRealTimeChart(realTimeChartData);     
                }
            }
            
            
        });

        $('#lastestUpdate').simpleTabs();
        $('#weiboTable').simpleTabs();

        
        $("#lessInfoBtn").click(function(e){
            e.preventDefault();
            $("#realTimeChartBlock").toggleClass("whenLess");
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

        // console.log($("#weiboTable table tbody tr").size());
        $("#weiboTable a.closeLastestBtn").click(function(e){
            e.preventDefault();
            var tb = $(this).parentsUntil(".tab-pane","table");
            var oldHeight = tb.height()
            tb.height(oldHeight-39);
            $(this).parent().parent().remove();
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

    function updateChartData(_chart, _id)
    {
        var chartInstance;
        var cData;
        var index = _id-1;
        switch(_chart)
        {
            case "q":
                cData = qbdxDataCollection;
                setQbdxChart(cData[index]);
                break;
            case "m":
                cData = mediaDataCollection;
                setMediaChart(cData[index]);
                break;
            case "t":
                cData = top10DataCollection;
                setBarChart(cData[index]);
                break;
            default:
                console.error("update chart data error!");
                return;
        }
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
                $("html,body").animate({scrollTop:$("#moreInfoBlock").offset().top},
                    1000,
                    function(){
                        if(!$("#moreInfoBlock").hasClass("ChartHasContent"))
                        {
                            $("#moreInfoBlock").addClass("ChartHasContent");                    
                            setQbdxChart(qbdxDataCollection[0]);
                            setMediaChart(mediaDataCollection[0]);    
                            setBarChart(top10DataCollection[0]);     
                        }
                    });
            });
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

    function setDefaultCharts()
    {
        
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
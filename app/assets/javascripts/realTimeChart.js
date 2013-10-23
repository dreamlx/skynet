define(
	["jquery","Chart.min"],
	function($, Chart)
	{
		var blockOffsetTop = $("#realTimeChartBlock").offset().top;
		var windowHeight = $(window).height();

		var init = function()
		{
			var blockOffset = blockOffsetTop - windowHeight;

		    if(blockOffset > 0)
		    {
		    	initScrollListener()
		    }else
		    {
		    	if(!$("#lineChart").hasClass("ChartHasContent"))
		        {
		           getData(); 
		        }
		    }
		}

		var initScrollListener = function()
		{
			$(window).on("scroll", scrollHandler);
		}

		var getData = function()
		{
			$("#lineChart").addClass("ChartHasContent");
            $.get("/home/realTimeChart.json", function(data){
                var realTimeChartData = makeRealTimeArr(data);
                setRealTimeChart(realTimeChartData); 

                $(window).trigger("moduleDataLoaded","realTimeChart");    
            }); 
		}

		var makeRealTimeArr = function(data)
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

		var setRealTimeChart = function(_data)
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

		var scrollHandler = function()
		{
			scrollTop = $(this).scrollTop();
	        
	        var blockOffset = blockOffsetTop - windowHeight;
	        if(scrollTop > 200+blockOffset)
	        {
	            if(!$("#lineChart").hasClass("ChartHasContent"))
	            {
	                getData();
	                $(window).off("scroll", scrollHandler)
	            }
	        }
		}

		return {
			init : init
		}
	}
);
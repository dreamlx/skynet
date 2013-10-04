define(
	[
		"jquery",
		"jquery.simpleTabs",
		"jquery.easing.min"
	],
	function($){
		var lastestYQ,lastestYJ;
		var init = function()
		{
			$.get("/home/weibo_yq.json", function(data){
	            lastestYQ = data;
	            
                var arrLen = data.length;
                var lastest = data[arrLen - 1];
                var lastestDom = $(".lastestYQ:first");
                buildLastest(lastestDom, lastest);

                $.get("/home/weibo_yj.json", function(data){
		            // console.log(data.arts.length);
		            lastestYJ = data;
		            
	                var arrLen = data.length;
	                var lastest = data[arrLen - 1];
	                var lastestDom = $(".lastestYJ:first");
	                buildLastest(lastestDom, lastest);	            
	                
	                $(window).trigger("moduleDataLoaded", "lastestUpdate");
		        });

	        });

	        

	        $('#lastestUpdate').simpleTabs();


		}

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

	    var buildAllLastest = function(type, tab)
		{
		    var tpl = $(".lastest"+type+":first");
		    data = type == "YQ"?lastestYQ:lastestYJ;
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

		var openAllLastest = function()
		{
			var h1=0;
		    var h2=0;
			if(lastestYQ.length>0)
		    {
		        h1 = buildAllLastest("YQ", 1);   
		    }
		    if(lastestYJ.length>0)
		    {
		        h2 = buildAllLastest("YJ", 2);
		    }
		    if(h1>0 || h2>0)
		    {
		        var allHeight = h1>h2?h1:h2
		        $("#lastestUpdate").height(allHeight+49);        
		    }
		}

		function buildLastest(dom, data)
		{
			dom.find("h3").html(data.text);
			dom.find(">p").html("<a href='"+data.url+"' target='_blank'>"+data['content']+"</a>");
			dom.find("span.lastestData").html(data.published_at);
		}

        return {
        	init:init,
        	openAllLastest:openAllLastest
        }
	}
);
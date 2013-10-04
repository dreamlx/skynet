requirejs.config({
    shim: {
        'jquery.easing.min': ['jquery'],
        'jquery.simpleTabs': ['jquery'],
        'printThis': ['jquery'],
        "Chart.min":{
            exports: "Chart"
        },
        "html2canvas":
        {
            exports:"html2canvas"
        },
        "jspdf/jspdf":
        {   
            deps:["jspdf/adler32cs","jspdf/FileSaver.min","jspdf/BlobBuilder"],
            exports:"jsPDF"
        },
        "jspdf/jspdf.plugin.addimage":["jspdf/jspdf"]        
    }
});
require(
    [
        "jquery",
        "domReady",
        "weiboList",
        "lastestUpdate",
        "fucMenu",
        "realTimeChart",
        "otherChartBlock",
        "printpdf"
    ],
    function($, ready, wbList, lastest, menu, realTimeCht, otherCht, pdf){
        
        // var lastestYQ = [];
        // var lastestYJ = [];
        // console.log(window.location.hash);

        var hash = window.location.hash.replace('#',"");
        $(window).bind("moduleDataLoaded", onDataLoaded);
        ready(function(){
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

            wbList.init();
            lastest.init();
            realTimeCht.init();
            otherCht.init();            
            
            menu.init(hash);
            pdf.init();
        });

        function onDataLoaded(e, moduleName)
        {
            switch(hash)
            {
                case "public":
                    if(moduleName == "weiboList")
                    {
                        menu.openPublicPage();
                    }
                    break;
                case "sensitive":
                    if(moduleName == "lastestUpdate")
                    {
                        menu.openSensitivePage();
                    }
                    break;
                case "report":
                    if(moduleName == "realTimeChart" || moduleName == "otherChartBlock")
                    {
                        menu.openReportPage();
                    }
                    break;
                default:
                    // menu.init();
                    break;
            }
        }

    }
);
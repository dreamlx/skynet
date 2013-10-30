define(
    ["jquery","html2canvas","jspdf/jspdf","jspdf/jspdf.plugin.addimage","printThis","jquery-migrate-1.2.1"],
    function($, html2canvas){

        var init = function()
        {
            $(".downloadBtn").click(function(e){
                
                if($.browser.safari)
                {
                    printDiv(this.hash);
                    e.preventDefault();
                    return;
                }
                var config = this.hash.substr(1,1);
                config = config == "q" || config == "m"?"small":"big"
                savePdf(this.hash, config);
                e.preventDefault();
            });

            $(".printBtn").click(function(e){
                printDiv(this.hash);
                e.preventDefault();
            })
        }

        function savePdf(_divId, _config)
        {
            var dom = $(_divId);
            dom.find("figure").hide();

            html2canvas(dom, {
                onrendered: function(canvas) {
                    data = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
                    // Convert the data to binary form
                    data = atob(data);
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

        return {
            init:init
        }
    }
);




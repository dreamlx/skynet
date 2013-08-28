define(["jquery"], function($){

	var instance = null;

	var _defaultFilterParams = {
		id_kind : -1,		//话题id
		orderby : "",		//排序
		state : 0,			//信息状态
		sourcetype : -1,	//媒介类型mediaType
		isgood:-1,			//调性
		starttime:"",		//自定义开始时间
		endtime:"",			//自定义结束时间
		searchtype:0,		//搜索类型
		searchkeyword:"",	//搜索词
		day_count:30,		//时间
		num:20,				//条数
		from:0				//起始条数
	};
 
    function MySingleton(){
        if(instance !== null){
            throw new Error("Cannot instantiate more than one MySingleton, use MySingleton.getInstance()");
        } 
        
        this.initialize();
    }
    MySingleton.prototype = {
        initialize: function(){
            // summary:
            //      Initializes the singleton.
            
            this.totalArticle = 0;
            this.currentPage = 0;
            this.totalPages = 0;
            this.listdata = null;
            this.filterParam = cloneObject(_defaultFilterParams);
            this.defaultFilterParams = _defaultFilterParams;
        },
        setDefault:function(){
        	this.filterParam = cloneObject(_defaultFilterParams);
        },
        queryListByFilter : function()
		{
			$.get("/home/articleList.json", this.filterParam, function(data){
				console.info(data);
				if(data.error)
				{
					alert(data.error);
					window.location = "/users/logout";
				}
				if(data.hasOwnProperty("total_number"))
				{

					instance.totalArticle = data.total_number;
				}else
				{
					instance.totalArticle = 0;
				}
				instance.currentPage = data.current_page;
				instance.totalPages = Math.ceil(instance.totalArticle / 20);

				instance.listData = data.arts;

				$(document).trigger("listDataCompleted");
			});
		}
    };
    MySingleton.getInstance = function(){
        // summary:
        //      Gets an instance of the singleton. It is better to use 
        if(instance === null){
            instance = new MySingleton();
        }
        return instance;
    };
 
    return MySingleton.getInstance();
	

	function cloneObject(obj){
	    var o = obj.constructor === Array ? [] : {};
	    for(var i in obj){
	        if(obj.hasOwnProperty(i)){
	            o[i] = typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];
	        }
	    }
	    return o;
	}
	
});
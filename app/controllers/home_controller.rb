# coding: utf-8
class HomeController < ApplicationController
	before_filter :auth_user!

	def index
	end

	def filterArticle
		
	end

	def articleParams
		# 文章分类， pid：父分类
		@article_kinds = getArtlist("article_kinds", "get_kind")
		puts_to_yaml(@article_kinds, "article_kinds")

		#data:  JSON格式，返回信息，status：信息状态，media_kind：媒介类型，date：时间，dx：调性
		@article_filters = getArtlist("article_filters", "get_filter")
		puts_to_yaml(@article_filters, 'article_filters')

		render json: { article_kinds: @article_kinds, article_filters:@article_filters }
	end

	def articleList
		condtions = ""
		condtions += "&id_kind=#{params[id_kind]}"
		condtions += "&orderby=#{params[orderby]}"
		condtions += "&state=#{params[state]}"
		condtions += "&sourcetype=#{params[sourcetype]}"
		condtions += "&isgood=#{params[isgood]}"
		condtions += "&starttime=#{params[starttime]}"
		condtions += "&endtime=#{params[endtime]}"
		condtions += "&searchtype=#{params[searchtype]}"
		condtions += "&searchkeyword=#{params[searchkeyword]}"
		condtions += "&day_count=#{params[day_count]}"
		condtions += "&num=#{params[num]}"
		condtions += "&from=#{params[from]}"

		final_condtions = condtions[1, condtions.length] if condtions[0] == "&"
		@article_list = getArtlist("article_list", "get_art_list", final_condtions)
		puts_to_yaml(@article_list, "article_list")

		render json: @article_list
	end

	def unreadItems
		@unread_items = getArtlist("unread_items", "get_new_num", "starttime=#{cookies['last_sigin']}")
		puts_to_yaml(@unread_items, "unread_items")

		render json: @unread_items
	end
	
	def weiboList
		#get weibo_list
		@weibo_list = getVoc("weibo_list",'get_wb_list')
		puts_to_yaml(@weibo_list, "weibo_list")

		respond_to do |format|
			format.json { render json: @weibo_list }
		end
	end

	#舆情
	def weibo_yq
		act         = 'get_yq_list'
		@weibo_yq   = getVoc("weibo_yq", act)
		puts_to_yaml(@weibo_yq, "weibo_yq")

		respond_to do |format|
			format.json { render json: @weibo_yq}
		end
	end

	#预警
	def weibo_yj    
		act         = 'get_yj_list'
		@weibo_yj   = getVoc("weibo_yj", act)
		puts_to_yaml(@weibo_yj, "weibo_yj")

		respond_to do |format|
			format.json { render json: @weibo_yj}
		end
	end

	def weiboTable
		#微博舆情
		#0为正面微博，1为负面微博，2为最热传播，3为最热评论，缺省为0
		act         = 'get_wb_yq'
		@weiboTable = getVoc("weiboTable", act)
		puts_to_yaml(@weiboTable, "weiboTable")  

		respond_to do |format|
			format.json { render json: @weiboTable}
		end  
	end

	def realTimeChart
		#图表部分
		#[动态趋势图]
		act = 'get_dtqs_list'
		@realTimeChart =  getVoc("realTimeChartBlock",act)
		puts_to_yaml(@realTimeChart, "realTimeChartBlock")

		respond_to do |format|
			format.json { render json: @realTimeChart}
		end  
	end

	def realTimeChartTitle
		#动态趋势图，title部分
		act = 'get_tit_num'
		@realTimeChartTitle = getVoc("realTimeChartTitle", act)
		puts_to_yaml(@realTimeChartTitle, "realTimeChartTitle")
		
		respond_to do |format|
			format.json { render json: @realTimeChartTitle}
		end
	end

	#today
	def qbdx_t
		#[全部调性]
		#date 整型，值为 1：当天，2：昨天，15：15天，缺省为1。
		act = 'get_dx'
		@qbdx_today      = getVoc("qbdx_today", act, "date=1")
		puts_to_yaml(@qbdx_today, "qbdx_today")
		respond_to do |format|
			format.json { render json: @qbdx_today}
		end
	end

	#yesterday
	def qbdx_y
		act = 'get_dx'
		@qbdx_yesterday  = getVoc("qbdx_yesterday", act, "date=2")
		puts_to_yaml(@qbdx_yesterday, "qbdx_yesterday")
		
		respond_to do |format|
			format.json { render json: @qbdx_yesterday}
		end
	end

	#week
	def qbdx_w
		act = 'get_dx'
		@qbdx_15days     = getVoc("qbdx_15days", act, "date=15")
		puts_to_yaml(@qbdx_15days, "qbdx_15days")
		respond_to do |format|
			format.json { render json: @qbdx_15days}
		end
	end

	def media_t
		act = 'get_media_kind'
		@media_kind_today      = getVoc("media_kind_today", act, "date=1")
		puts_to_yaml(@media_kind_today, "media_kind_today")
		respond_to do |format|
			format.json { render json: @media_kind_today}
		end
	end

	def media_y
		act = 'get_media_kind'
		@media_kind_today      = getVoc("media_kind_yesterday", act, "date=2")
		puts_to_yaml(@media_kind_today, "media_kind_yesterday")
		respond_to do |format|
			format.json { render json: @media_kind_today}
		end
	end

	def media_w
		act = 'get_media_kind'
		@media_kind_today      = getVoc("media_kind_15days", act, "date=15")
		puts_to_yaml(@media_kind_today, "media_kind_15days")
		respond_to do |format|
			format.json { render json: @media_kind_today}
		end
	end

	def top10_t
		act = 'get_web_top10'
		@top10_today     = getVoc("top10_today", act, "date=1")
		puts_to_yaml(@top10_today, "top10_today")
		respond_to do |format|
			format.json { render json: @top10_today}
		end    
	end

	def top10_y
		act = 'get_web_top10'
		@top10_today     = getVoc("top10_yesterday", act, "date=1")
		puts_to_yaml(@top10_today, "top10_yesterday")
		respond_to do |format|
			format.json { render json: @top10_today}
		end    
	end

	def top10_w
		act = 'get_web_top10'
		@top10_today     = getVoc("top10_15days", act, "date=1")
		puts_to_yaml(@top10_today, "top10_15days")
		respond_to do |format|
			format.json { render json: @top10_today}
		end    
	end

	##操作##
	#发送预警，批量发送（如果只有一个id，那么aid=id；如果有多个aid=id1,id2,id3）
	def send_warning
		act = 'send_warning'
		if params[:aids].blank?
			render status: 400, json: {:message=>"需要参数ids，格式'id1,id2,id3...'"}
     else
			@send_warning = getProcess("send_warning", act, "aid=#{params[:aids]}")
			puts_to_yaml(@send_warning, "send_warning")
			render json: @send_warning
		end
	end

	#收藏，批量收藏（如果只有一个id，那么aid=id；如果有多个aid=id1,id2,id3）
	def add_favorite
		act = 'add_favorite'
		if params[:aids].blank?
			render status: 400, json: {:message=>"需要参数aids，格式'id1,id2,id3...'"}
     else
			@add_favorite = getProcess("add_favorite", act, "aid=#{params[:aids]}")
			puts_to_yaml(@add_favorite, "add_favorite")
			render json: @add_favorite
		end
	end

	#添加备注，批量添加（如果只有一个id，那么aid=id；如果有多个aid=id1,id2,id3）
	def add_info
		act = 'add_info'
		if params[:aids].blank? or params[:info].blank?
			render status: 400, json: {:message=>"需要参数aids：格式'id1,id2,id3...', 参数：info"}
     else
			@add_info = getProcess("add_info", act, "aid=#{params[:aids]}&info=#{params[:info]}")
			puts_to_yaml(@add_info, "add_info")
			render json: @add_info
		end
	end

  #删除，批量删除
	def del_article
		act = 'del_article'
		if params[:aids].blank?
			render status: 400, json: {:message=>"需要参数aids，格式'id1,id2,id3...'"}
     else
			@del_article = getProcess("del_article", act, "aid=#{params[:aids]}")
			puts_to_yaml(@del_article, "del_article")
			render json: @del_article
		end
	end

	# 置顶
	#aid 字符型，文章Id。  [必选]
  #val 字符型，更改的值，1：置顶，0：取消置顶，缺省为1。[可选]
	def set_top
		act = 'set_top'
		if params[:aid].blank? or params[:val].blank?
			render status: 400, json: {:message=>"需要参数id,val"}
     else
			@set_top = getProcess("set_top", act, "aid=#{params[:aid]}&val=#{params[:val]}")
			puts_to_yaml(@set_top, "set_top")
			render json: @set_top
		end
	end

	# 设置热门
	#aid 字符型，文章Id。  [必选]
  #val 字符型，更改的值，1：热门，0：取消热门，缺省为1。[可选]
	def set_hot
		act = 'set_hot'
		if params[:aid].blank? or params[:val].blank?
			render status: 400, json: {:message=>"需要参数id,val"}
     else
			@set_hot = getProcess("set_hot", act, "aid=#{params[:aid]}&val=#{params[:val]}")
			puts_to_yaml(@set_hot, "set_hot")
			render json: @set_hot
		end
	end

  #获取命中关键字
	def get_hit_word
		act = 'get_hit_word'
		if params[:aid].blank?
			render status: 400, json: {:message=>"需要参数id"}
     else
			@get_hit_word = getProcess("get_hit_word", act, "aid=#{params[:aid]}")
			puts_to_yaml(@get_hit_word, "get_hit_word")
			render json: @get_hit_word
		end
	end

  #设置预警级别，val：0-4，缺省 1
	def set_level
		act = 'get_hit_word'
		if params[:aid].blank? or params[:val].blank?
			render status: 400, json: {:message=>"需要参数id,val"}
     else
			@set_level = getProcess("set_level", act, "aid=#{params[:aid]}&val=params[:val]")
			puts_to_yaml(@set_level, "set_level")
			render json: @set_level
		end
	end

	private
	def getVoc(yaml,act, params=nil)
		if !session[:current_user]
			return get_voc("api_index.cgi", act, params)['arts']
		else
			return get_yaml(yaml)
		end
	end

	def getArtlist(yaml, act, params=nil)
		if session[:current_user]
			return get_voc("api_artlist.cgi", act, params)
		else
			return get_yaml(yaml)
		end
	end

		def getProcess(yaml,act, params=nil)
		if !session[:current_user]
			return get_voc("api_proccess.cgi", act, params)
		else
			return get_yaml(yaml)
		end
	end
end

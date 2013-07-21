# coding: utf-8
class HomeController < ApplicationController
  #before_filter :auth_user!

  def index
    if !session[:current_user]
      api_port     = "api_index.cgi"

      #get weibo_list
      act         = 'get_wb_list'
      @weibo_list = get_voc(api_port, act)['arts']
      puts_to_yaml(@weibo_list, "weibo_list")

      #舆情
      act         = 'get_yq_list'
      @weibo_yq   = get_voc(api_port, act)['arts']
      puts_to_yaml(@weibo_yq, "weibo_yq")

      #预警
      act         = 'get_yj_list'
      @weibo_yj   = get_voc(api_port, act)['arts']
      puts_to_yaml(@weibo_yj, "weibo_yj")

      #微博舆情
      #0为正面微博，1为负面微博，2为最热传播，3为最热评论，缺省为0
      act         = 'get_wb_yq'
      @weiboTable = []
      @weiboTable[0] = get_voc(api_port, act, "index=0")['arts']
      @weiboTable[1] = get_voc(api_port, act, "index=1")['arts']
      @weiboTable[2] = get_voc(api_port, act, "index=2")['arts']
      @weiboTable[3] = get_voc(api_port, act, "index=3")['arts']
      puts_to_yaml(@weiboTable, "weiboTable")


      #图表部分
      #[动态趋势图]
      act = 'get_dtqs_list'
      gon.realTimeChartBlock =  get_voc(api_port, act)
      puts_to_yaml(gon.realTimeChartBlock, "realTimeChartBlock")

      #动态趋势图，title部分
      act = 'get_tit_num'
      gon.realTimeChartTitle = get_voc(api_port, act)
      puts_to_yaml(gon.realTimeChartTitle, "realTimeChartTitle")
      
      #[全部调性]
      #date 整型，值为 1：当天，2：昨天，15：15天，缺省为1。
      act = 'get_dx'
      gon.qbdx_today      = get_voc(api_port, act, "date=1")
      gon.qbdx_yesterday  = get_voc(api_port, act, "date=2")
      gon.qbdx_15days     = get_voc(api_port, act, "date=15")

      puts_to_yaml(gon.qbdx_today, "qbdx_today")
      puts_to_yaml(gon.qbdx_yesterday, "qbdx_yesterday")
      puts_to_yaml(gon.qbdx_15days, "qbdx_15days")

      #[媒体类型]
      act = 'get_media_kind'
      gon.media_kind_today      = get_voc(api_port, act, "date=1")
      gon.media_kind_yesterday  = get_voc(api_port, act, "date=2")
      gon.media_kind_15days     = get_voc(api_port, act, "date=15")

      puts_to_yaml(gon.media_kind_today, "media_kind_today")
      puts_to_yaml(gon.media_kind_yesterday, "media_kind_yesterday")
      puts_to_yaml(gon.media_kind_15days, "media_kind_15days")

      #top10
      act = 'get_web_top10'
      gon.top10_today     = get_voc(api_port, act, "date=1")
      gon.top10_yesterday = get_voc(api_port, act, "date=2")
      gon.top10_15days    = get_voc(api_port, act, "date=15")

      puts_to_yaml(gon.top10_today, "top10_today")
      puts_to_yaml(gon.top10_yesterday, "top10_yesterday")
      puts_to_yaml(gon.top10_15days, "top10_15days")

    else

      @weibo_list = get_yaml("weibo_list")
      
      @weibo_yq   = get_yaml("weibo_yq")
      
      @weibo_yj   = get_yaml("weibo_yj")
      
      @weiboTable = get_yaml("weiboTable")
      
      gon.realTimeChartBlock = get_yaml("realTimeChartBlock")     
      gon.realTimeChartTitle = get_yaml("realTimeChartTitle")
     
      gon.qbdx_today = get_yaml("qbdx_today")
      gon.qbdx_yesterday = get_yaml("qbdx_yesterday")
      gon.qbdx_15days = get_yaml("qbdx_15days")

      #@weibo_list = get_yaml("weibo_list")
      
      #@weibo_yq   = get_yaml("weibo_yq")
      
      #@weibo_yj   = get_yaml("weibo_yj")
      
      @weiboTable = get_yaml("weiboTable")
      
      #gon.realTimeChartBlock = get_yaml("realTimeChartBlock")
      
      gon.realTimeChartTitle = get_yaml("realTimeChartTitle")
     
      gon.qbdx_today = get_yaml("qbdx_today")
      gon.qbdx_yesterday = get_yaml("qbdx_yesterday")
      gon.qbdx_15days = get_yaml("qbdx_15days")

      gon.media_kind_today = get_yaml("media_kind_today")
      gon.media_kind_yesterday = get_yaml("media_kind_yesterday")
      gon.media_kind_15days = get_yaml("media_kind_15days")

      gon.top10_today = get_yaml("top10_today")
      gon.top10_yesterday = get_yaml("top10_yesterday")
      gon.top10_15days = get_yaml("top10_15days")
    end
  end

  def weiboList
    base_url = 'http://imws.voc.com.cn/cgi-bin/imetrics/api'
    api_url = "#{base_url}/api_index.cgi"
    http = login_to_remote(session[:current_user][:name], session[:current_user][:password])
    if http.http_get
      # puts hash_login: 
      # {"code"=>"200", "data"=>{"id_cp"=>30, "id_gp"=>183, "VOC_CenterID"=>"432bee3c62e2dcf01ef76a87b59ba49178", "url"=>"http://imws.voc.com.cn/imetrics/30_183.html"}} 
      hash_login  = json2hash(http.body_str)

      #get weibo_list
      act         = 'get_wb_list'
      @weibo_list = json2hash(get_voc(api_url, act, hash_login, http))['arts']
      puts_to_yaml(@weibo_list, "weibo_list")


      gon.top10_today = get_yaml("top10_today")
      gon.top10_yesterday = get_yaml("top10_yesterday")
      gon.top10_15days = get_yaml("top10_15days")
    end
  end

  def lastestUpdate
    base_url = 'http://imws.voc.com.cn/cgi-bin/imetrics/api'
    api_url = "#{base_url}/api_index.cgi"
    http = login_to_remote(session[:current_user][:name], session[:current_user][:password])
    if http.http_get
      # puts hash_login: 
      # {"code"=>"200", "data"=>{"id_cp"=>30, "id_gp"=>183, "VOC_CenterID"=>"432bee3c62e2dcf01ef76a87b59ba49178", "url"=>"http://imws.voc.com.cn/imetrics/30_183.html"}} 
      hash_login  = json2hash(http.body_str)

      #舆情
      act         = 'get_yq_list'
      weibo_yq   = json2hash(get_voc(api_url, act, hash_login, http))['arts']
      puts_to_yaml(weibo_yq, "weibo_yq")
      @weibo_yq = get_yaml("weibo_yq")
      #预警
      act         = 'get_yj_list'
      weibo_yj   = json2hash(get_voc(api_url, act, hash_login, http))['arts']
      puts_to_yaml(weibo_yj, "weibo_yj")
      @weibo_yj = get_yaml("weibo_yj")
      render layout: false
    else
      render json2hash(http.body_str), status: :unprocessable_entity
    end
  end


  def realTimeChartBlock
    base_url = 'http://imws.voc.com.cn/cgi-bin/imetrics/api'
    api_url = "#{base_url}/api_index.cgi"
    http = login_to_remote(session[:current_user][:name], session[:current_user][:password])
    if http.http_get
      # puts hash_login: 
      # {"code"=>"200", "data"=>{"id_cp"=>30, "id_gp"=>183, "VOC_CenterID"=>"432bee3c62e2dcf01ef76a87b59ba49178", "url"=>"http://imws.voc.com.cn/imetrics/30_183.html"}} 
      hash_login  = json2hash(http.body_str)
      #[动态趋势图]
      act = 'get_dtqs_list'
      gon.realTimeChartBlock =  get_voc(api_url, act, hash_login, http)
      puts_to_yaml(json2hash(gon.realTimeChartBlock), "realTimeChartBlock")

      gon.realTimeChartBlock = get_yaml("realTimeChartBlock")

      render layout: false
    else
      render json2hash(http.body_str), status: :unprocessable_entity
    end
  end

  private

end

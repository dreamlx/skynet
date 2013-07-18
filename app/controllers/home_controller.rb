# coding: utf-8
class HomeController < ApplicationController
    before_filter :auth_user!

  def index

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

      render layout: false
    else
      render json2hash(http.body_str), status: :unprocessable_entity
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

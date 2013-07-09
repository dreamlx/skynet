# coding: utf-8
class HomeController < ApplicationController
  before_filter :auth_user!

  def index
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

      #舆情
      act         = 'get_yq_list'
      @weibo_yq   = json2hash(get_voc(api_url, act, hash_login, http))['arts']
      puts_to_yaml(@weibo_yq, "weibo_yq")

      #预警
      act         = 'get_yj_list'
      @weibo_yj   = json2hash(get_voc(api_url, act, hash_login, http))['arts']
      puts_to_yaml(@weibo_yj, "weibo_yj")

      #微博舆情
      #0为正面微博，1为负面微博，2为最热传播，3为最热评论，缺省为0
      act         = 'get_wb_yq'
      @weiboTable = []
      @weiboTable[0] = json2hash(get_voc(api_url, act, hash_login, http,"index=0"))['arts']
      @weiboTable[1] = json2hash(get_voc(api_url, act, hash_login, http,"index=1"))['arts']
      @weiboTable[2] = json2hash(get_voc(api_url, act, hash_login, http,"index=2"))['arts']
      @weiboTable[3] = json2hash(get_voc(api_url, act, hash_login, http,"index=3"))['arts']
      puts_to_yaml(@weiboTable, "weiboTable")

      #图表部分
      #[动态趋势图]
      act = 'get_dtqs_list'
      gon.realTimeChartBlock =  get_voc(api_url, act, hash_login, http)
      puts_to_yaml(json2hash(gon.realTimeChartBlock), "realTimeChartBlock")

      #动态趋势图，title部分
      act = 'get_tit_num'
      gon.realTimeChartTitle = get_voc(api_url, act, hash_login, http)
      puts_to_yaml(json2hash(gon.realTimeChartTitle), "realTimeChartTitle")
      
      #[全部调性]
      #date 整型，值为 1：当天，2：昨天，15：15天，缺省为1。
      act = 'get_dx'
      gon.qbdx_today = get_voc(api_url, act, hash_login, http,"date=1")
      gon.qbdx_yesterday = get_voc(api_url, act, hash_login, http,"date=2")
      gon.qbdx_15days = get_voc(api_url, act, hash_login, http,"date=15")

      puts_to_yaml(json2hash(gon.qbdx_today), "qbdx_today")
      puts_to_yaml(json2hash(gon.qbdx_yesterday), "qbdx_yesterday")
      puts_to_yaml(json2hash(gon.qbdx_15days), "qbdx_15days")
      #[媒体类型]
      act = 'get_media_kind'
      gon.media_kind_today = get_voc(api_url, act, hash_login, http,"date=1")
      gon.media_kind_yesterday = get_voc(api_url, act, hash_login, http,"date=2")
      gon.media_kind_15days = get_voc(api_url, act, hash_login, http,"date=15") 

      puts_to_yaml(json2hash(gon.media_kind_today), "media_kind_today")
      puts_to_yaml(json2hash(gon.media_kind_yesterday), "media_kind_yesterday")
      puts_to_yaml(json2hash(gon.media_kind_15days), "media_kind_15days")

      #top10
      act = 'get_web_top10'
      gon.top10_today = get_voc(api_url, act, hash_login, http,"date=1")
      gon.top10_yesterday = get_voc(api_url, act, hash_login, http,"date=2")
      gon.top10_15days = get_voc(api_url, act, hash_login, http,"date=15")      

      puts_to_yaml(json2hash(gon.top10_today), "top10_today")
      puts_to_yaml(json2hash(gon.top10_yesterday), "top10_yesterday")
      puts_to_yaml(json2hash(gon.top10_15days), "top10_15days")
    else
              
      @weibo_list = get_yaml("weibo_list")
      
      @weibo_yq   = get_yaml("weibo_yq")
      
      @weibo_yj   = get_yaml("weibo_yj")
      
      @weiboTable = get_yaml("weiboTable")
      
      gon.realTimeChartBlock = get_yaml("realTimeChartBlock").to_json
      
      gon.realTimeChartTitle = get_yaml("realTimeChartTitle").to_json
     
      gon.qbdx_today = get_yaml("qbdx_today").to_json
      gon.qbdx_yesterday = get_yaml("qbdx_yesterday").to_json
      gon.qbdx_15days = get_yaml("qbdx_15days").to_json

      gon.media_kind_today = get_yaml("media_kind_today").to_json
      gon.media_kind_yesterday = get_yaml("media_kind_yesterday").to_json
      gon.media_kind_15days = get_yaml("media_kind_15days").to_json

      gon.top10_today = get_yaml("top10_today").to_json
      gon.top10_yesterday = get_yaml("top10_yesterday").to_json
      gon.top10_15days = get_yaml("top10_15days").to_json

    end
  end

  private

end
